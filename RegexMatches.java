import java.util.Scanner;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexMatches {

   public static void main( String args[] ) {
      Scanner sc = new Scanner(System.in);
	   
	   // String to be scanned to find the pattern.
      String line = sc.nextLine();
      String temp = line;
      String pattern1 = "(.*)(\"skills\":\\[[^\\]]*\\])(.*)";
      //String pattern2 = "(.*)(\"email\":\\[)([^\\]]*)(\\].*)";

      // Create a Pattern object
      Pattern r = Pattern.compile(pattern1);
      //Pattern s = Pattern.compile(pattern2);

      // Now create matcher object.
      Matcher m = r.matcher(line);
      //Matcher n = s.matcher(temp);
      
      if (m.find( )) {
         //String result = "(" + n.group(3) + " ," + m.group(2) +")";
    	  String result = m.group(2);
    	  System.out.println(result);
      }else {
         System.out.println("NO MATCH");
      }
   }
}