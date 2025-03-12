// import lombok.Data;

// @Data
// public class Favorite {
//     private String uid;
//     private String itemName;
//     private boolean selected;  // 항목이 선택됐는지 여부를 나타내는 필드
//     private LocalDateTime createdAt;
// }





// import org.springframework.data.jpa.repository.JpaRepository;

// public interface FavoriteRepository extends JpaRepository<Favorite, Long> {
//     // 필요한 쿼리 메서드를 추가할 수 있습니다.
//     List<Favorite> findByUid(String uid);
// }




// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.stereotype.Service;
// import java.util.List;

// @Service
// public class FavoriteService {

//     @Autowired
//     private FirebaseAuth firebaseAuth;

//     @Autowired
//     private FavoriteRepository favoriteRepository;

// Firebase 인증을 통해 uid 확인
//     private String verifyTokenAndGetUid(String idToken) throws Exception {
//     FirebaseToken decodedToken = firebaseAuth.verifyIdToken(idToken);
//     return decodedToken.getUid();
// }

//     public Favorite addFavorite(Favorite favorite) {
//         favorite.setCreatedAt(LocalDateTime.now())
//         return favoriteRepository.save(favorite);
//     }

//     public List<Favorite> getFavoritesByUid(String uid) {
//         return favoriteRepository.findByUid(uid);  // userId -> uid로 변경
//     }

//     public void removeFavorite(Long id) {
//         favoriteRepository.deleteById(id);
//     }
// }






// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.web.bind.annotation.*;
// import java.util.List;

// @RestController
// @RequestMapping("/api/favorites")
// public class FavoriteController {

//     @Autowired
//     private FavoriteService favoriteService;

//     @PostMapping
//     public Favorite addFavorite(@RequestBody Favorite favorite) {
//         return favoriteService.addFavorite(favorite);
//     }

//     @GetMapping("/{uid}")
//     public List<Favorite> getFavorites(@PathVariable String uid) {
//         return favoriteService.getFavoritesByUid(uid);
//     }

//     @DeleteMapping("/{id}")
//     public void removeFavorite(@PathVariable Long id) {
//         favoriteService.removeFavorite(id);
//     }
// }








// 아래 Firebase Admin SDK 설치
// mvn install:install-file -Dfile=<path_to_your_service_account_json_file> -DgroupId=com.google.firebase -DartifactId=firebase-admin -Dversion=8.1.0 -Dpackaging=jar


// import com.google.firebase.FirebaseApp;
// import com.google.firebase.FirebaseOptions;
// import com.google.firebase.auth.FirebaseAuth;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import java.io.FileInputStream;
// import java.io.IOException;

// @Configuration
// public class FirebaseConfig {

//     @Bean
//     public FirebaseAuth firebaseAuth() throws IOException {
//         FileInputStream serviceAccount =
//                 new FileInputStream("path/to/your/serviceAccountKey.json");

//         FirebaseOptions options = new FirebaseOptions.Builder()
//                 .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                 .build();

//         FirebaseApp.initializeApp(options);
//         return FirebaseAuth.getInstance();
//     }
// }
