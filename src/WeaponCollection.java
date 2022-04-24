import java.util.*;

public class WeaponCollection {

    private HashMap<String, WeaponType> weaponCollection;

    public WeaponCollection() {
        weaponCollection = new HashMap<>();
    }

    public WeaponCollection(HashMap<String, WeaponType> weaponCollection) {
        this.weaponCollection = weaponCollection;
    }

    public void addToCollection(WeaponType weapon) {
        weaponCollection.put(weapon.getName(), weapon);
    }

    public void printCollection() {
        //System.out.println(weaponCollection);

        for (String key : weaponCollection.keySet()) {
            WeaponType tempWeap = weaponCollection.get(key);
            System.out.println(tempWeap.getName());

            for (FrameType frame : tempWeap.getFrameTypes()) {
                System.out.println(frame.getName());
                System.out.println("Kinetic: " + frame.getKineticWeapons());
                System.out.println("Stasis: " + frame.getStasisWeapons());
                System.out.println("Arc: " + frame.getArcWeapons());
                System.out.println("Solar: " + frame.getSolarWeapons());
                System.out.println("Void: " + frame.getVoidWeapons());
            }

            System.out.println();
        }
    }
}
