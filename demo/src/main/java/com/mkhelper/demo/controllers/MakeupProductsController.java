package com.mkhelper.demo.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.mkhelper.demo.models.MakeupProductType;
import com.mkhelper.demo.models.pojo.MakeupProductPojo;
import com.mkhelper.demo.repositories.IMakeupProductTypeRepository;
import com.mkhelper.demo.services.MakeupProductService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/makeup/products/")
@RequiredArgsConstructor
@Data
public class MakeupProductsController {

    private final IMakeupProductTypeRepository makeupProductTypeRepository;

    private final MakeupProductService makeupProductService;

    @GetMapping("{facePart}")
    public ResponseEntity<List<MakeupProductPojo>> getProductsForFacePart(@PathVariable String facePart){
        return new ResponseEntity<>(getMakeupProductService().getMakeupProductsForFacePart(facePart), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<MakeupProductPojo>> getProducts(){
        return new ResponseEntity<>(getMakeupProductService().getAllMakeupProducts(), HttpStatus.OK);
    }

    @GetMapping("favorites")
    public ResponseEntity<List<MakeupProductPojo>> getFavoriteProducts(){
        return new ResponseEntity<>(getMakeupProductService().getFavoriteProducts(), HttpStatus.OK);
    }

    @GetMapping("types")
    public ResponseEntity<List<String>> getProductsTypes(){
        return ResponseEntity.status(HttpStatus.OK).
                body(
                        getMakeupProductTypeRepository()
                        .findAll()
                        .stream()
                        .map(MakeupProductType::getType)
                        .collect(Collectors.toList()));
    }

    @PostMapping(path="add/product")
    public void addMakeupProduct(@RequestParam("files") MultipartFile[] files, @RequestParam("product") String product) throws JsonProcessingException {
        getMakeupProductService().saveMakeupProduct(product, files);
    }

    @PostMapping(path="change/favorite")
    public void addMakeupProduct(@RequestParam("productName") String productName, @RequestParam("favorite") String favorite) {
        getMakeupProductService().changeProductFavoriteState(productName, favorite);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<String> deleteMakeupProductByName(@PathVariable String name) {
        boolean deleted = makeupProductService.deleteMakeupProductByName(name);

        if (deleted) {
            return ResponseEntity.ok("Makeup product deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Makeup product not found.");
        }
    }
}
