package com.example.sarvasva.app.activities;

import static android.content.ContentValues.TAG;

import android.content.Intent;
import android.graphics.drawable.ColorDrawable;
import android.os.Build;
import android.os.Bundle;
import android.text.Html;
import android.util.Log;
import android.view.MenuItem;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.viewpager.widget.ViewPager;

import com.example.sarvasva.R;
import com.example.sarvasva.app.Classes.ProductImagesAdaptor;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.tabs.TabLayout;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ProductDetailsActivity extends AppCompatActivity {

   private List<String> productImagesList = new ArrayList<>();
   private ViewPager pager;
   private TabLayout viewPagersDots;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_product_details);

        String title = "ALL PHOTOS";
//        getSupportActionBar().setTitle(title);
//        getSupportActionBar().setDisplayShowTitleEnabled(true);
//        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
//        getSupportActionBar().setBackgroundDrawable(new ColorDrawable(getResources().getColor(R.color.primary)));

        productImagesList = new ArrayList<>();
        pager = findViewById(R.id.productImageViewPager);
        viewPagersDots = findViewById(R.id.viewPagerDots);


        FirebaseFirestore.getInstance().collection("IMAGES").document(
                "CLUB_GALLERY")
                .get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {
                if (task.isSuccessful())
                {    DocumentSnapshot shot = task.getResult();
                if (shot.exists()) {
                    Log.d(TAG, "DocumentSnapshot data: " + shot.getData());

                  if (getIntent().getStringExtra("gallery_reference").equals("edc")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("aveon")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("gdsc")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("acm")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("ehsaas")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("epac")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("firebolt")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("ieee")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("ieicivil")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("iete")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("iet")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("litsoc")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("sds")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("srijan")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }

                  else if (getIntent().getStringExtra("gallery_reference").equals("unesquo")) {
                      productImagesList = (List<String>) shot.get(getIntent().getStringExtra("gallery_reference"));
                  }



                    //setting the data







                    ProductImagesAdaptor adaptor = new ProductImagesAdaptor(productImagesList);
                    pager.setAdapter(adaptor);
                    viewPagersDots.setupWithViewPager(pager , true);


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
    public boolean onOptionsItemSelected(@NonNull MenuItem item) {
        if (item.getItemId() == android.R.id.home)
        {
           finish();
        }
        return super.onOptionsItemSelected(item);
    }

}