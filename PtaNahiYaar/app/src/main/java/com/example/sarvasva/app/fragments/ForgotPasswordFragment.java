package com.example.sarvasva.app.fragments;

import static com.example.sarvasva.app.activities.AuthenticationActivity.isLoginFragment;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import com.example.sarvasva.R;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.FirebaseAuth;
//import com.google.android.gms.tasks.OnCompleteListener;
//import com.google.android.gms.tasks.Task;
//import com.google.firebase.auth.FirebaseAuth;


public class ForgotPasswordFragment extends Fragment {


private TextView goBackBtn;
private FrameLayout parentFrameLayout;
private EditText emailEt;
private Button resetBtn;
private FirebaseAuth firebaseAuth;
private ProgressBar progressBar;


    public ForgotPasswordFragment() {
        // Required empty public constructor
    }



    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_forgot_password, container, false);

         goBackBtn = view.findViewById(R.id.GoBackBtn);
         emailEt = view.findViewById(R.id.emailEt);
         resetBtn = view.findViewById(R.id.resetBtn);
         progressBar = view.findViewById(R.id.progBar);







        return view;}


    @Override
    public void onViewCreated(@NonNull  View view, @Nullable  Bundle savedInstanceState) {

        firebaseAuth = FirebaseAuth.getInstance();

        parentFrameLayout = requireActivity().findViewById(R.id.frameLayoutAuth);
        goBackBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isLoginFragment = true;
                changeFragment(new LoginFragment());
            }

        });

        resetBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (!emailEt.getText().toString().equals("")) {

                    progressBar.setVisibility(View.VISIBLE);
                    resetBtn.setEnabled(false);
                    resetBtn.setText("");

                    firebaseAuth.sendPasswordResetEmail(emailEt.getText().toString().trim()).addOnCompleteListener(new OnCompleteListener<Void>() {
                        @Override
                        public void onComplete(@NonNull Task<Void> task) {

                            if (task.isSuccessful()) {

                                Toast.makeText(getContext() , "Email Sent Successfully. Check Spam Folder" , Toast.LENGTH_LONG).show();

                            } else {
                                Toast.makeText(getContext() , "Something Went Wrong" +task.getException().getMessage() , Toast.LENGTH_LONG).show();

                                progressBar.setVisibility(View.INVISIBLE);
                                resetBtn.setEnabled(true);
                                resetBtn.setText("Reset Password");


                            }
                            progressBar.setVisibility(View.INVISIBLE);
                            resetBtn.setEnabled(true);
                            resetBtn.setText("Reset Password");

                        }

                    });
                }
                else
                {
                    emailEt.setError("Please Enter Your Registered Email");
                }

            }
        });



    }

    private void changeFragment(Fragment fragment) {
        FragmentTransaction fragmentTransaction = requireActivity().getSupportFragmentManager().beginTransaction();
        fragmentTransaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_right);
        fragmentTransaction.replace(parentFrameLayout.getId(), fragment);
        fragmentTransaction.commit();

    }
}