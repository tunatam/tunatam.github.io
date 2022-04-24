import java.util.ArrayList;

public class FrameType {

    private String name;
    private ArrayList<String> kineticWeapons, stasisWeapons, arcWeapons, solarWeapons, voidWeapons;

    public FrameType (String name) {
        this.name = name;
        this.kineticWeapons = new ArrayList<>();
        this.stasisWeapons = new ArrayList<>();
        this.arcWeapons = new ArrayList<>();
        this.solarWeapons = new ArrayList<>();
        this.voidWeapons = new ArrayList<>();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setOneWeaponList(DamageTypes damageTypes, ArrayList<String> list) {
        switch (damageTypes) {
            case KINETIC:
                kineticWeapons = list;
                break;
            case STASIS:
                stasisWeapons = list;
                break;
            case ARC:
                arcWeapons = list;
                break;
            case SOLAR:
                solarWeapons = list;
                break;
            case VOID:
                voidWeapons = list;
                break;
            default:
                break;
        }
    }

    public void setAllLists(ArrayList<String> kineticWeapons,
                            ArrayList<String> stasisWeapons,
                            ArrayList<String> arcWeapons,
                            ArrayList<String> solarWeapons,
                            ArrayList<String> voidWeapons ) {

        this.kineticWeapons = kineticWeapons;
        this.stasisWeapons = stasisWeapons;
        this.arcWeapons = arcWeapons;
        this.solarWeapons = solarWeapons;
        this.voidWeapons = voidWeapons;
    }

    public ArrayList<String> getKineticWeapons() {
        return kineticWeapons;
    }

    public ArrayList<String> getStasisWeapons() {
        return stasisWeapons;
    }

    public ArrayList<String> getArcWeapons() {
        return arcWeapons;
    }

    public ArrayList<String> getSolarWeapons() {
        return solarWeapons;
    }

    public ArrayList<String> getVoidWeapons() {
        return voidWeapons;
    }

    public ArrayList<String> getOneWeaponList(DamageTypes damageTypes) {
        switch (damageTypes) {
            case KINETIC:
                return kineticWeapons;
            case STASIS:
                return stasisWeapons;
            case ARC:
                return arcWeapons;
            case SOLAR:
                return solarWeapons;
            case VOID:
                return voidWeapons;
            default:
                return null;
        }
    }

    public void addKineticWeapon(String weapon) {
        kineticWeapons.add(weapon);
    }

    public void addStasisWeapon(String weapon) {
        stasisWeapons.add(weapon);
    }

    public void addArcWeapon(String weapon) {
        arcWeapons.add(weapon);
    }

    public void addSolarWeapon(String weapon) {
        solarWeapons.add(weapon);
    }

    public void addVoidWeapon(String weapon) {
        voidWeapons.add(weapon);
    }

    public void addOneWeapon(String weapon, DamageTypes damageTypes) {
        switch (damageTypes) {
            case KINETIC:
                kineticWeapons.add(weapon);
                break;
            case STASIS:
                stasisWeapons.add(weapon);
                break;
            case ARC:
                arcWeapons.add(weapon);
                break;
            case SOLAR:
                solarWeapons.add(weapon);
                break;
            case VOID:
                voidWeapons.add(weapon);
                break;
            default:
                break;
        }
    }
}
