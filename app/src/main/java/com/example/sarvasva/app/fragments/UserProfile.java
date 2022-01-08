package com.example.sarvasva.app.fragments;

import static android.content.ContentValues.TAG;

import android.content.Intent;
import android.os.Bundle;

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.TextClock;
import android.widget.TextView;

import com.example.sarvasva.R;
import com.example.sarvasva.app.Classes.HorizontalSliderAdapter;
import com.example.sarvasva.app.activities.MainActivity;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;

import java.util.List;


public class UserProfile extends Fragment {
    private FrameLayout parentFrameLayout;
    private FirebaseFirestore firestore;
    private FirebaseAuth fireBaseAuth;
    private TextView userNameTv , userRollTv , userBranchTv , userPhnTv , userMailTv;
    private String userName , userRoll , userBranch , userPhn , userMail;

    public UserProfile() {
        // Required empty public constructor
    }


    // TODO: Rename and change types and number of parameters



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_user_profile, container, false);

        userNameTv = view.findViewById(R.id.user_name);
        userBranchTv = view.findViewById(R.id.user_branch);
        userRollTv = view.findViewById(R.id.user_roll);
        userPhnTv = view.findViewById(R.id.user_phn);
        userMailTv = view.findViewById(R.id.user_mail);

        OnBackPressedCallback callback = new OnBackPressedCallback(true /* enabled by default */) {
            @Override
        public void handleOnBackPressed() {
            // Handle the back button event
            Intent intent = new Intent(getContext() , MainActivity.class);
            startActivity(intent);
            getActivity().finish();

        }
    };
    requireActivity().getOnBackPressedDispatcher().addCallback(getActivity(), callback);




        return view;
    }
    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        parentFrameLayout = getActivity().findViewById(R.id.main_activity_frame_layout);

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




                        userName = (String)shot.get("full name");
                        userBranch = (String)shot.get("branch");
                        userRoll = (String)shot.get("roll");
                        userPhn = (String)shot.get("mobile_no");
                        userMail = (String)shot.get("email");
                        //setting the data

                        userRollTv.setText(userRoll);
                        userNameTv.setText(userName);
                        userBranchTv.setText(userBranch);
                        userPhnTv.setText(userPhn);
                        userMailTv.setText(userMail);





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
    private void changeFragment(Fragment fragment) {
        FragmentTransaction fragmentTransaction = getActivity().getSupportFragmentManager().beginTransaction();
        fragmentTransaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_right);
        fragmentTransaction.replace(parentFrameLayout.getId(), fragment);
        fragmentTransaction.commit(); }
}