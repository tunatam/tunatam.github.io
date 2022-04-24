import java.util.*;

public class WeaponType {

    private String weaponTypeName;
    private ArrayList<FrameType> frameTypes;

    public WeaponType(String name) {
        this.weaponTypeName = name;
        this.frameTypes = new ArrayList<>();
    }

    public void addFrameType(FrameType frameType) {
        frameTypes.add(frameType);
    }

    public String getName() {
        return weaponTypeName;
    }

    public void setName(String name) {
        this.weaponTypeName = name;
    }

    public ArrayList<FrameType> getFrameTypes() {
        return frameTypes;
    }
}
