package com.mkhelper.demo.services;

import com.mkhelper.demo.Constants;
import org.springframework.stereotype.Service;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.NodeList;

import javax.annotation.PostConstruct;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

@Service
public class TranslationService {

        private Map<String, Map<String, String>> translations;

        @PostConstruct
        private void postConstruct(){
            translations = new HashMap<>();
            loadTranslationsFromXML();
        }

        public String getTranslation(String languageCode, String textKey) {
            Map<String, String> languageTranslations = translations.get(languageCode);
            if (languageTranslations != null) {
                String translation = languageTranslations.get(textKey);
                if (translation != null) {
                    return translation;
                }
            }
            return "Translation not found";
        }


        private void loadTranslationsFromXML() {
            try {
                File xmlFile = new File(System.getProperty("user.dir") + File.separator + "demo/src/main/resources/translations.xml");
                DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
                DocumentBuilder builder = factory.newDocumentBuilder();
                Document document = builder.parse(xmlFile);

                NodeList languageNodes = document.getElementsByTagName("language");
                for (int i = 0; i < languageNodes.getLength(); i++) {
                    Element languageElement = (Element) languageNodes.item(i);
                    String languageCode = languageElement.getAttribute("code");

                    Map<String, String> languageTranslations = new HashMap<>();
                    NodeList messageNodes = languageElement.getElementsByTagName("message");
                    for (int j = 0; j < messageNodes.getLength(); j++) {
                        Element messageElement = (Element) messageNodes.item(j);
                        String textKey = messageElement.getAttribute("name");
                        String translation = messageElement.getTextContent();
                        languageTranslations.put(textKey, translation);
                    }

                    translations.put(languageCode, languageTranslations);
                }
                System.out.println("");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
}
