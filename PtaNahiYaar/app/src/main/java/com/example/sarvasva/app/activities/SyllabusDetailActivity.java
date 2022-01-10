package com.example.sarvasva.app.activities;

import static android.content.ContentValues.TAG;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.graphics.drawable.ColorDrawable;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.widget.TextView;

import com.example.sarvasva.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.Objects;

public class SyllabusDetailActivity extends AppCompatActivity {

    private FirebaseFirestore firestore;
    private TextView courseCodeTv , courseTitleTv , module1Tv, module5Tv, module4Tv,
            module3Tv, module2Tv , referenceBookTv , textBookTv;
    private String courseCode , courseTitle , module1, module5,
            module4, module3, module2 , referenceBook , textBook ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_syllabus_detail);

        firestore = FirebaseFirestore.getInstance();

        courseCodeTv = findViewById(R.id.courseCodeTv);
        courseTitleTv = findViewById(R.id.courseTitleTv);
        module1Tv = findViewById(R.id.module1Tv);
        module2Tv = findViewById(R.id.module2Tv);
        module3Tv = findViewById(R.id.module3Tv);
        module4Tv = findViewById(R.id.module4Tv);
        module5Tv = findViewById(R.id.module5Tv);
        textBookTv = findViewById(R.id.textBookTv);
        referenceBookTv = findViewById(R.id.referenceBookTv);

        String title = "SYLLABUS DETAIL";
//        Objects.requireNonNull(getSupportActionBar()).setTitle(title);
//        getSupportActionBar().setDisplayShowTitleEnabled(true);
//        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(getResources().getColor(R.color.primary)));


        firestore.collection("SYALLABUS").document(
                getIntent().getStringExtra("course")).collection("BRANCH").document(getIntent().getStringExtra("branch"))
                .collection("SEMESTER").document(getIntent().getStringExtra("sem")).collection("SUBJECTS")
                .document(getIntent().getStringExtra("subject")).get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful()) {
                    DocumentSnapshot shot = task.getResult();
                    if (shot.exists()) {
                        Log.d(TAG, "DocumentSnapshot data: " + shot.getData());


                        module1 = (String) shot.get("MODULE1");
                        module2 = (String) shot.get("MODULE2");
                        module3 = (String) shot.get("MODULE3");
                        module4 = (String) shot.get("MODULE4");
                        module5 = (String) shot.get("MODULE5");

                        courseCode = (String) shot.get("COURSECODE");
                        courseTitle = (String) shot.get("COURSETITLE");
                        referenceBook = (String) shot.get("REFERENCEBOOK");
                        textBook = (String) shot.get("TEXTBOOK");

                        //setting the data

                        module1Tv.setText(module1);
                        module2Tv.setText(module2);
                        module3Tv.setText(module3);
                        module4Tv.setText(module4);
                        module5Tv.setText(module5);
                        courseCodeTv.setText(courseCode);
                        courseTitleTv.setText(courseTitle);
                        textBookTv.setText(textBook);
                        referenceBookTv.setText(referenceBook);

                        //end setting data


                    } else {
                        Log.d(TAG, "No such document");
                    }
                } else {
                    Log.d(TAG, "get failed with ", task.getException());
                }

            }
        });




    }


    @Override
    public void onBackPressed() {
        super.onBackPressed();
        Intent intent = new Intent(SyllabusDetailActivity.this , SyallabusActivity.class);
        startActivity(intent);
        finish();
    }
}