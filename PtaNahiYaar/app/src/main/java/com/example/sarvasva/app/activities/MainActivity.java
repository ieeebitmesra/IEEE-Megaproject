package com.example.sarvasva.app.activities;
import static android.content.ContentValues.TAG;

import androidx.annotation.NonNull;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;
import androidx.core.view.GravityCompat;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.MenuItem;
import android.view.View;
import android.widget.CheckBox;
import android.widget.ExpandableListView;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.sarvasva.R;
import com.example.sarvasva.app.fragments.ClubDirectory;
import com.example.sarvasva.app.fragments.Colledge_directory_page;
import com.example.sarvasva.app.fragments.HomeFragment;
import com.example.sarvasva.app.fragments.UserProfile;

import com.example.sarvasva.app.fragments.Announcements;
import com.example.sarvasva.app.fragments.WebVliewERP;
import com.example.sarvasva.app.fragments.aboutus;
import com.example.sarvasva.app.fragments.schedule_directory;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.navigation.NavigationView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
//import com.google.firebase.auth.FirebaseAuth;

public class MainActivity extends AppCompatActivity {
    private NavigationView navigationView;
    private ActionBarDrawerToggle toggle;
    private DrawerLayout drawerLayout;
    private Toolbar toolbar;
    private View navHeader;
    private TextView currentUserTv , clubsTv , titleTvMain;
    private ImageView userProfilePicture;
    private String currentUser;
    private FirebaseFirestore firestore;
    private FirebaseAuth fireBaseAuth;
    private DrawerLayout drawer;
    private ExpandableListView drawerList;
    private CheckBox checkBox;
    private ActionBarDrawerToggle actionBarDrawerToggle;
    FragmentTransaction fragmentTransaction;


    private FrameLayout parentFrameLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        navigationView = findViewById(R.id.navigationView);
        drawerLayout = findViewById(R.id.main_drawer_layout);
        toolbar = findViewById(R.id.activity_main_toolbar);
        parentFrameLayout = findViewById(R.id.main_activity_frame_layout);
        titleTvMain = findViewById(R.id.titleTvMain);


        toggle = new ActionBarDrawerToggle(this, drawerLayout, toolbar, R.string.drawerOpen, R.string.drawerClose);

        drawerLayout.addDrawerListener(toggle);
        toggle.syncState();
        navigationView.setItemIconTintList(null);


        setFragment(new HomeFragment());


        navHeader = navigationView.getHeaderView(0);
        currentUserTv = (TextView) navHeader.findViewById(R.id.currentUser);
        userProfilePicture = (ImageView) navHeader.findViewById(R.id.user_profile_icon);





//        drawer = (DrawerLayout) findViewById(R.id.drawer_layout2);
//        drawerList = (ExpandableListView) findViewById(R.id.left_drawer2);
//        drawerList.setAdapter(new ExpandableListAdapter(this, groupItem, childItem));

          userProfilePicture.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Todo : change activity to user profile
                setFragment(new UserProfile());




                        if (drawerLayout.isDrawerOpen(GravityCompat.START))
                        {
                            drawerLayout.closeDrawer(GravityCompat.START);
                        }
                        else
                        {
                            drawerLayout.openDrawer(GravityCompat.START);
                        }


            }
        });


          currentUserTv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                // Todo : change activity to user profile
                setFragment(new UserProfile());




                if (drawerLayout.isDrawerOpen(GravityCompat.START))
                {
                    drawerLayout.closeDrawer(GravityCompat.START);
                }
                else
                {
                    drawerLayout.openDrawer(GravityCompat.START);
                }


            }
          });
          //ammouncement , also the home page


          navigationView.setNavigationItemSelectedListener(new NavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
                Fragment fragment = null;
                Class fragmentClass;
                switch (menuItem.getItemId()) {
                    case R.id.nav_home:

                        goToFragment(new Announcements() , "ANNOUNCEMENT");

                        break;

                    case R.id.nav_clubs:
                        goToFragment(new ClubDirectory() , "CLUBS");
                        break;

                    case R.id.nav_SYLLABUS:

                        Intent intent3 = new Intent(MainActivity.this , SyallabusActivity.class);
                        startActivity(intent3);
                        finish();
                        break;

                    case R.id.nav_MAPS:

                        Intent intent1 = new Intent(MainActivity.this , GoogleMapsInSarvasva.class);
                        startActivity(intent1);
                        finish();
                        break;

                    case R.id.nav_SCHEDULES:
                        goToFragment(new schedule_directory(), "SCHEDULE");
                        break;

                    case R.id.nav_ERP:
                        goToFragment(new WebVliewERP() , "ERP");
                        break;

                    case R.id.nav_DIRECTORY:
                        goToFragment(new Colledge_directory_page() , "CAMPUS DIRECTORY");
                        break;

                    case R.id.nav_AboutUs:
                        setFragment(new aboutus());
                        break;

                    case R.id.nav_Logout:

                        FirebaseAuth.getInstance().signOut();

                        // todo: clea all data of the user;

                        Intent intent = new Intent(MainActivity.this , AuthenticationActivity.class);
                        startActivity(intent);
                        finish();
                        break;
                    default:
                        fragmentClass = Announcements.class;
                }


                // Insert the fragment by replacing any existing fragment

                // Highlight the selected item has been done by NavigationView
                menuItem.setChecked(true);
                // Set action bar title

                // Close the navigation drawer

                drawerLayout.closeDrawer(GravityCompat.START);



                return true;
            }

        });

        toolbar.setNavigationOnClickListener(new View.OnClickListener() {


            @Override
            public void onClick(View v) {
                if (drawerLayout.isDrawerOpen(GravityCompat.START))
                {
                    drawerLayout.closeDrawer(Gravity.RIGHT);
                }
                else
                    {
                    drawerLayout.openDrawer(GravityCompat.START);
                    }
            }
        });

        firestore = FirebaseFirestore.getInstance();
        fireBaseAuth = FirebaseAuth.getInstance();


        firestore.collection("USERS").document(fireBaseAuth.getUid())
                .get().addOnCompleteListener(new OnCompleteListener<DocumentSnapshot>() {
            @Override
            public void onComplete(@NonNull Task<DocumentSnapshot> task) {

                if (task.isSuccessful())
                {    DocumentSnapshot shot = task.getResult();
                    if (shot.exists()) {
                        Log.d(TAG, "DocumentSnapshot data: " + shot.getData());




                        currentUser = (String)shot.get("full name");

                        //setting the data

                        currentUserTv.setText(currentUser);






                    }



                    else {
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
        if (getFragmentManager().getBackStackEntryCount() > 0 ){
            getFragmentManager().popBackStack();
        } else {
            super.onBackPressed();
        }
    }



    private void setFragment(Fragment fragment)
    {

        fragmentTransaction = getSupportFragmentManager().beginTransaction();
        fragmentTransaction.setCustomAnimations(R.anim.fui_slide_in_right, R.anim.fui_slide_out_left);
        fragmentTransaction.replace(parentFrameLayout.getId(),fragment);
        fragmentTransaction.commit();

    }


    private void goToFragment(Fragment fragment , String title)
    {

        setFragment(fragment);
        titleTvMain.setText(title);


    }


}