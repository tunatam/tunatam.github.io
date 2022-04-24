import javax.xml.crypto.Data;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.*;

public class TestMain {

    public static void main(String args[]) throws IOException {

        WeaponCollection database = DatabaseUtilities.createDatabase();
        database.printCollection();
        
    }

}
