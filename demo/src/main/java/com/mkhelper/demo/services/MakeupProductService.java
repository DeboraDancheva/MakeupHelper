package com.mkhelper.demo.services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mkhelper.demo.config.AppConfig;
import com.mkhelper.demo.models.MakeupProduct;
import com.mkhelper.demo.models.MakeupProductMedia;
import com.mkhelper.demo.models.Media;
import com.mkhelper.demo.models.pojo.MakeupProductPojo;
import com.mkhelper.demo.repositories.IMakeupProductMediaRepository;
import com.mkhelper.demo.repositories.IMakeupProductTypeRepository;
import com.mkhelper.demo.repositories.IProductRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Data
@Service
public class MakeupProductService {

    private final IProductRepository productRepository;

    private final MediaService mediaService;

    private final IMakeupProductMediaRepository makeupProductMediaRepository;

    private final IMakeupProductTypeRepository makeupProductTypeRepository;

    private final AppConfig appConfig;

    public List<MakeupProductPojo> getMakeupProductsForFacePart(String facePart) {
        List<MakeupProduct> products = getProductRepository().findAllByFacePart(facePart).get();
        return generateMakeupProductPojo(products);
    }


    public List<MakeupProductPojo> getAllMakeupProducts() {
        List<MakeupProduct> products = getProductRepository().findAll();
        return generateMakeupProductPojo(products);
    }

    public List<MakeupProductPojo> getFavoriteProducts() {
        List<MakeupProduct> products = getAppConfig().getCurrentUser().getFavouriteProducts();
        return generateMakeupProductPojo(products);
    }
    private List<MakeupProductPojo> generateMakeupProductPojo(List<MakeupProduct> products) {
        List<MakeupProductPojo> pojos = new ArrayList<>();
        for (MakeupProduct product : products) {
            Optional<MakeupProduct> favorite = getAppConfig().getCurrentUser().getFavouriteProducts().stream().filter(x->x.getName().equals(product.getName())).findFirst();
            List<MakeupProductMedia> productMedia = getMakeupProductMediaRepository().findByMakeupProduct(product).get();
            boolean isFavorite = favorite.isPresent();
            MakeupProductPojo pojo = MakeupProductPojo.builder()
                    .productType(product.getType().getType())
                    .productName(product.getName())
                    .facePart(product.getFacePart())
                    .brand(product.getBrand())
                    .description(product.getDescription())
                    .averageReview(product.getAverageReview())
                    .price(product.getPrice())
                    .favorite(isFavorite)
                    .mediaNames(productMedia.stream().map(m -> m.getMedia().getName()).collect(Collectors.toList()))
                    .build();
            pojos.add(pojo);
        }
        return pojos;
    }

    public void saveMakeupProduct(String makeupProductPojo, MultipartFile[] files) throws JsonProcessingException {

        ObjectMapper objectMapper = new ObjectMapper();
        MakeupProductPojo product = objectMapper.readValue(makeupProductPojo, MakeupProductPojo.class);

        getProductRepository().save(MakeupProduct.builder()
                .facePart(product.getFacePart())
                .description(product.getDescription())
                .brand(product.getBrand())
                .name(product.getProductName())
                .type(getMakeupProductTypeRepository().findAllByType(product.getProductType()).get())
                .build());

        saveProductMedia(files, product.getProductName());
    }

    public void saveProductMedia(MultipartFile[] files, String productName) {
        MakeupProduct product = getProductRepository().findByName(productName).get();

        for (MultipartFile f : files) {
            Media m = saveFile(f);
            MakeupProductMedia mPm = MakeupProductMedia.builder().makeupProduct(product).media(m).build();
            getMakeupProductMediaRepository().save(mPm);
        }
    }

    private Media saveFile(MultipartFile file) {
        String contentType = file.getContentType();
        byte[] content = new byte[0];
        try {
            content = file.getBytes();

            String fileExtension = getMediaService().getFileExtension(file.getOriginalFilename());

            String mediaType = getMediaService().isVideo(contentType, fileExtension) ? "video" : "image";

            File destFile = new File(getMediaService().getLocationToSave() + File.separator + file.getOriginalFilename());
            file.transferTo(destFile);

            return getMediaService().saveMedia(mediaType, content, file.getOriginalFilename(), null);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void changeProductFavoriteState(String productName, String favorite) {
        MakeupProduct pr = getProductRepository().findByName(productName).get();
        var user = getAppConfig().getCurrentUser();

        if(favorite.equals(Boolean.TRUE.toString())) {
            user.getFavouriteProducts().add(pr);
        } else {
            user.getFavouriteProducts().removeIf(product -> product.getName().equals(pr.getName()));
        }
    }

    public boolean deleteMakeupProductByName(String name) {
        var makeupProduct = productRepository.findByName(name);

        if (makeupProduct.isPresent()) {
            productRepository.delete(makeupProduct.get());
            return true;
        }

        return false;
    }
}
