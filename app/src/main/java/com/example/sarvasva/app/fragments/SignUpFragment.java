package com.example.sarvasva.app.fragments;


import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.text.Editable;
import android.text.TextWatcher;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

;
import com.example.sarvasva.R;
import com.example.sarvasva.app.activities.MainActivity;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
//import com.google.android.gms.tasks.OnCompleteListener;
//import com.google.android.gms.tasks.Task;
//import com.google.firebase.auth.AuthResult;
//import com.google.firebase.auth.FirebaseAuth;
//import com.google.firebase.firestore.CollectionReference;
//import com.google.firebase.firestore.FirebaseFirestore;
//


import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class SignUpFragment extends Fragment {
    private EditText emailEt , passwordEt , cnfPassEt, fullNameEt , mobileEt , rollEt , branchEt;
    private Button signUpButton;
    private ImageView closeBtn;
    private TextView loginBtn;
    private FrameLayout parentFrameLayout;
    private ProgressBar progressBar;

    private FirebaseAuth fireBaseAuth;
    private FirebaseFirestore firestore;
    private String emailPattern = "[a-zA-Z0-9._-]+@[a-z]+\\.+[a-z]+\\.+[a-z]+";




    public SignUpFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_sign_up, container, false);
//        closeBtn = view.findViewById(R.id.closeBtn);
        loginBtn = view.findViewById(R.id.loginBtn);
        emailEt = view.findViewById(R.id.emailEt);
        passwordEt = view.findViewById(R.id.passEt);
        signUpButton = view.findViewById(R.id.mainsignUpBtn);
        cnfPassEt = view.findViewById(R.id.cnfPassET);
        fullNameEt = view.findViewById(R.id.fullNameEt);
        mobileEt = view.findViewById(R.id.mobileNumber);
        progressBar = view.findViewById(R.id.progBar);
        rollEt = view.findViewById(R.id.collegeRollNumEt);
        branchEt = view.findViewById(R.id.branchEt);


        return view;


    }








    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        parentFrameLayout = getActivity().findViewById(R.id.frameLayoutAuth);

        fireBaseAuth = FirebaseAuth.getInstance();
        firestore = FirebaseFirestore.getInstance();

        fullNameEt.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                checkInputs();
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });
        emailEt.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                checkInputs();
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });
        mobileEt.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                checkInputs();
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });
        passwordEt.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                checkInputs();
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });
        cnfPassEt.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                checkInputs();
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });

        signUpButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(emailEt.getText().toString().matches(emailPattern))
                {
                    if (passwordEt.getText().toString().equals(cnfPassEt.getText().toString()))
                    {
                        // ready to authenticate;
                        signUpButton.setEnabled(false);
                        progressBar.setVisibility(View.VISIBLE);
                        signUpButton.setText("");

                        String email = emailEt.getText().toString();
                        String password = passwordEt.getText().toString();
                        fireBaseAuth.createUserWithEmailAndPassword(email , password).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                            @Override
                            public void onComplete(@NonNull Task<AuthResult> task) {
                                if (task.isSuccessful())
                                {
                                    fireBaseAuth.signInWithEmailAndPassword(email , password).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                                        @Override
                                        public void onComplete(@NonNull Task<AuthResult> task) {
                                            if (task.isSuccessful()) {

                                                // date -- firebase
                                                Map<String , Object> basicDetails = new HashMap<>();
                                                basicDetails.put("full name", fullNameEt.getText().toString());
                                                basicDetails.put("mobile_no", mobileEt.getText().toString());
                                                basicDetails.put("email", emailEt.getText().toString());
                                                basicDetails.put("roll", rollEt.getText().toString());
                                                basicDetails.put("branch", branchEt.getText().toString());


                                                firestore.collection("USERS").document(fireBaseAuth.getUid()).set(basicDetails).addOnCompleteListener(task1 -> {
                                                    if (task1.isSuccessful()) {



                                                                        Intent intent = new Intent(getContext(), MainActivity.class);
                                                                        Toast.makeText(getContext(), "Logged In!", Toast.LENGTH_SHORT).show();
                                                                        startActivity(intent);
                                                                        getActivity().finish();

                                                                    }
                                                    else
                                                                    {
                                                                        fireBaseAuth.signOut();
                                                                        progressBar.setVisibility(View.INVISIBLE);
                                                                        signUpButton.setText("SIGN UP");

                                                                        Toast.makeText(getContext(), "Something Went Wrong" + task1.getException(), Toast.LENGTH_SHORT).show();
                                                                    }
                                                                });





                                                            }


                                            else
                                            {
                                                progressBar.setVisibility(View.INVISIBLE);
                                                signUpButton.setText("SIGN UP");
                                                Toast.makeText(getContext(), "Some Error Occured" + task.getException().getMessage(), Toast.LENGTH_SHORT).show();

                                            }

                                        }
                                    });


                                    Toast.makeText(getContext(), "Your Account Has Been Created", Toast.LENGTH_SHORT).show();
                                }
                                else
                                {
                                    Toast.makeText(getContext(), "Some Error Occured" + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                                    signUpButton.setEnabled(true);
                                    progressBar.setVisibility(View.INVISIBLE);
                                    signUpButton.setText("SIGN UP");

                                }

                            }
                        });
                    }
                    else{
                        cnfPassEt.setError("Passwords do not match");
                    }
                }
                else
                {
                    emailEt.setError("Please Enter The Valid Email Address");
                }




            }
        });



        loginBtn.setOnClickListener(new View.OnClickListener() {


            @Override
            public void onClick(View v) {

                changeFragment(new LoginFragment());
            }
        });

//        closeBtn.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v) {
//                Intent intent = new Intent(getContext(), MainActivity.class);
//                startActivity(intent);
//                getActivity().finish();
//
//            }
//        });
    }

    private void checkInputs() {
        if (!fullNameEt.getText().toString().equals("")) {
            //full name has not been filed till now;

            if (!emailEt.getText().toString().equals("")) {

                if (!mobileEt.getText().toString().equals("")) {

                    if ((!passwordEt.getText().toString().equals("")) && (passwordEt.getText().toString().length() >= 6)) {

                        if (!cnfPassEt.getText().toString().equals("")) {

                            signUpButton.setEnabled(true);
                        } else {
                            signUpButton.setEnabled(false);
                            cnfPassEt.setError("Please Enter Confirm Password Field");
                        }
                    } else {
                        signUpButton.setEnabled(false);
                        passwordEt.setError("Please Must be of atleast 6 Characters ");

                    }


                }

                else
                {
                    signUpButton.setEnabled(false);
                    mobileEt.setError("Please Enter Mobile Field");

                }
            } else {
                signUpButton.setEnabled(false);
                emailEt.setError("Please Enter Email Field");

            }
        } else {
            signUpButton.setEnabled(false);
            fullNameEt.setError("Please Enter Name Field");


        }
    }



    private void changeFragment(Fragment fragment) {
        FragmentTransaction fragmentTransaction = getActivity().getSupportFragmentManager().beginTransaction();
        fragmentTransaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_right);
        fragmentTransaction.replace(parentFrameLayout.getId(), fragment);
        fragmentTransaction.commit();

    }




}


