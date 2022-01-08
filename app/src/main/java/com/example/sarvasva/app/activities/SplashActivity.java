package com.example.sarvasva.app.activities;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import com.example.sarvasva.R;
import com.google.firebase.auth.FirebaseAuth;
//import com.google.firebase.auth.FirebaseAuth;


public class SplashActivity extends AppCompatActivity {

    private Animation topAnim , bottomAnim;
    private ImageView logoIv;
    private TextView logoTv;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);
        topAnim = AnimationUtils.loadAnimation(this,R.anim.splash_top_animation);
        bottomAnim= AnimationUtils.loadAnimation(this,R.anim.splash_bottom_animation);


        logoIv = findViewById(R.id.logoIv);
        logoTv = findViewById(R.id.logoTv);

        logoIv.setAnimation(topAnim);
        logoTv.setAnimation(bottomAnim);

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {
                // todo: check if user is already logged in or not

             FirebaseAuth auth = FirebaseAuth.getInstance();
               if (auth.getCurrentUser() == null)
               {
                  Intent mainIntent = new Intent(SplashActivity.this,AuthenticationActivity.class);
                   startActivity(mainIntent);
                   finish();
               }
                else
               {
                    Intent mainIntent = new Intent(SplashActivity.this, MainActivity.class);
                    startActivity(mainIntent);
                    finish();
                }


//            finish();
            }
        },3000);





    }
}