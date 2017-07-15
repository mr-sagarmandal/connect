import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ExtractHotWords {

   public static void main( String args[] ) {
      Scanner sc = new Scanner(System.in);
	  String line = "";
	  boolean out = false;
	  
	  System.out.print("\"skills\": [");
	   // String to be scanned to find the pattern.
	  String temp = "";
      while (sc.hasNextLine()) {
    	  line = sc.nextLine();
    	  if (out) {
    		  if (line.equals(""))
    			  break;
    		  temp += '"' + line +'"' + ",";
    	  }
    	  if (line.equals("============="))
    			  out = true;
      }
      temp = temp.substring(0,temp.lastIndexOf(','));
      		 System.out.print(temp + "]");
      //String pattern1 = "(.*)(\"skills\":\\[[^\\]]*\\])(.*)";
      //String pattern2 = "(.*)(\"email\":\\[)([^\\]]*)(\\].*)";

      // Create a Pattern object
      //Pattern r = Pattern.compile(pattern1);
      //Pattern s = Pattern.compile(pattern2);

      // Now create matcher object.
      //Matcher m = r.matcher(line);
      //Matcher n = s.matcher(temp);
      
      //if (m.find( )) {
         //String result = "(" + n.group(3) + " ," + m.group(2) +")";
    	//  String result = m.group(2);
    	//  System.out.println(result);
      //}else {
      //   System.out.println("NO MATCH");
      //}
   }
}