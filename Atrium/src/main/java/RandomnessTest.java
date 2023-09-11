package main.java;

import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RandomnessTest {
    public static void main(String[] args) throws NoSuchAlgorithmException {
        SecureRandom secureRandom = SecureRandom.getInstanceStrong();
        Map<Integer, List<Integer>> final_list = new HashMap<>();

        int number_of_repetation = 50, listSize = 50;

        for (int i = 0; i < number_of_repetation; i++) {

            List<Integer> innerList = new ArrayList<>();
            for (int j = 0; j < listSize; j++) {
                innerList.add(secureRandom.nextInt(listSize - j));
            }
            System.out.println(innerList);
            final_list.put(i, innerList);
        }

    }
}
