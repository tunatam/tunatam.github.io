import java.io.*;
import java.nio.file.Path;
import java.util.*;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.NodeList;
import org.w3c.dom.Node;
import org.w3c.dom.Element;
import org.xml.sax.SAXException;

import java.io.File;

import java.nio.file.Paths;

import java.util.ArrayList;


public class DatabaseUtilities {



    public static WeaponCollection createDatabase() {
        try {
            // Get the databases
            ArrayList<File> listOfDBs = getDatabaseFiles();
            return importDatabase(listOfDBs);
        }
        catch(Exception e) {
            e.printStackTrace();
        }

        return null;
    }

    private static ArrayList<File> getDatabaseFiles() {
        // Get the current file path
        Path currentRelativePath = Paths.get("");
        String s = currentRelativePath.toAbsolutePath().toString();

        //System.out.println("\nCurrent absolute path is: " + s + "\n");

        File folder = new File(s + "\\src\\Weapons\\");
        File[] listOfFiles = folder.listFiles();

        ArrayList<File> listOfDBs = new ArrayList<File>();

        for (int i = 0; i < listOfFiles.length; i++) {
            if (listOfFiles[i].isFile()) {
                //System.out.println("File " + listOfFiles[i].getName());
                listOfDBs.add(listOfFiles[i]);
            }
        }

        return listOfDBs;
    }

    private static WeaponCollection importDatabase(ArrayList<File> listOfDBs)
            throws ParserConfigurationException, IOException, SAXException {

        WeaponCollection database = new WeaponCollection();

        for (File file : listOfDBs) {
            DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
            DocumentBuilder db = dbf.newDocumentBuilder();
            Document doc = db.parse(file);
            doc.getDocumentElement().normalize();

            // Create the specific weaponType object
            String weaponTypeName = doc.getElementsByTagName("weaponList").item(0)
                    .getAttributes().getNamedItem("weaponType").getNodeValue();;
            WeaponType weaponType = new WeaponType(weaponTypeName);

            // Get the frames and weapons in the file
            NodeList frameList = doc.getElementsByTagName("frame");
            NodeList weaponList = doc.getElementsByTagName("weapon");

            // Loop through all the frames
            for (int frameItr = 0; frameItr < frameList.getLength(); frameItr++) {
                Node frameNode = frameList.item(frameItr);

                if (frameNode.getNodeType() == Node.ELEMENT_NODE) {
                    String frameTypeName = frameNode.getAttributes().getNamedItem("frameType").getNodeValue();

                    // Create the specific frameType object
                    FrameType frameType = new FrameType(frameTypeName);

                    // Loop through all the weapons WRT to the frames
                    for (int weapIter = weaponList.getLength()-1; weapIter >= 0 ; weapIter--) {
                        Node weapNode = weaponList.item(weapIter);

                        if (weapNode.getNodeType() == Node.ELEMENT_NODE &&
                                weapNode.getParentNode().isSameNode(frameNode)) {
                            Element temp = (Element) weapNode;
                            String weaponName = temp.getElementsByTagName("name").item(0).getTextContent();
                            String tempEleType = temp.getElementsByTagName("elementType").item(0).getTextContent();
                            DamageTypes dmgType = DamageTypes.valueOf(tempEleType);

                            // Put the weapon in the right Weapon/Frame/weaponList
                            frameType.addOneWeapon(weaponName, dmgType);

                            // Remove the weapon from the list
                            weapNode.getParentNode().removeChild(weapNode);
                        }
                    }

                    // Add the frameType to the weaponType
                    weaponType.addFrameType(frameType);
                }
            }

            // Add the weaponType to the weaponCollection
            database.addToCollection(weaponType);
        }

        return database;
    }
}
