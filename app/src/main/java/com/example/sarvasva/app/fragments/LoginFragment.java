package com.example.sarvasva.app.fragments;


import static android.content.ContentValues.TAG;
import com.example.sarvasva.app.activities.MainActivity;
import static com.example.sarvasva.app.activities.AuthenticationActivity.isLoginFragment;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;

import androidx.activity.result.ActivityResult;
import androidx.activity.result.ActivityResultCallback;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;
import com.example.sarvasva.R;
import com.example.sarvasva.app.activities.AuthenticationActivity;
import com.example.sarvasva.app.activities.MainActivity;
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.auth.AuthCredential;
import com.google.firebase.auth.AuthResult;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GoogleAuthProvider;

import android.util.Log;
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
//
//import com.google.firebase.auth.AuthResult;
//import com.google.firebase.auth.FirebaseAuth;


public class LoginFragment extends Fragment {

    private TextView forgotPassTv, signUpTv;
    private FrameLayout parentFrameLayout;
//    private ImageView close;
    private EditText emailEt, passEt;
    private FirebaseAuth auth ;
    GoogleSignInClient mGoogleSignInClient;
    private Button loginBtn ;
    private ProgressBar progressBar;
    private static final int RC_SIGN_IN = 234;




    public LoginFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        View view = inflater.inflate(R.layout.fragment_login, container, false);

        forgotPassTv = view.findViewById(R.id.forgetPass);
        signUpTv = view.findViewById(R.id.signUpBtn);
//        close = view.findViewById(R.id.closeBtn);
        emailEt = view.findViewById(R.id.emailEt);
        passEt = view.findViewById(R.id.passwordEt);
        loginBtn = view.findViewById(R.id.loginBtn);
        progressBar = view.findViewById(R.id.progLoginBar);



        return view;

    }


    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        parentFrameLayout = getActivity().findViewById(R.id.frameLayoutAuth);
        auth = FirebaseAuth.getInstance();
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(getString(R.string.default_web_client_id))
                .requestEmail()
                .build();

        mGoogleSignInClient = GoogleSignIn.getClient(getContext() , gso);
        GoogleSignInAccount     account = GoogleSignIn.getLastSignedInAccount(getContext());

        view.findViewById(R.id.sign_in_button).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                signIn();
            }
        });





        loginBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (!emailEt.getText().toString().equals(""))
                {
                    if (!passEt.getText().toString().equals(""))
                    {
                        //authenticate
                        loginBtn.setEnabled(false);
                        progressBar.setVisibility(View.VISIBLE);

                        loginBtn.setText("");

                        try {

                            String email = emailEt.getText().toString().trim();
                            String pass = passEt.getText().toString().trim();

                            auth.signInWithEmailAndPassword(email , pass).addOnCompleteListener(new OnCompleteListener<AuthResult>() {
                                @Override
                                public void onComplete(@NonNull Task<AuthResult> task) {

                                    if (task.isSuccessful())
                                    {
                                        Intent intent = new Intent(getContext(), MainActivity.class);
                                        Toast.makeText(getContext(), "Logged In!", Toast.LENGTH_SHORT).show();
                                        startActivity(intent);
                                        getActivity().finish();
                                    }
                                    else
                                    {
                                        Toast.makeText(getContext(), "Some Error Occured" + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                                        loginBtn.setEnabled(true);
                                    }
                                }

                            });

                        }
                        catch (Exception e)
                        {
                            e.printStackTrace();
                        }


                    }
                    else
                    {
                        passEt.setError("Please Enter The Password");
                    }

                }
                else {
                    passEt.setError("Please Enter The EMAIL");

                }
                progressBar.setVisibility(View.INVISIBLE);

                loginBtn.setText("Login");


            }
        });

        forgotPassTv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isLoginFragment = false;
                changeFragment(new ForgotPasswordFragment());

            }
        });
        signUpTv.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                isLoginFragment = false;
                changeFragment(new SignUpFragment());

            }
        });
//        close.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View v)
//            {
//
//                Intent intent = new Intent(getContext(), MainActivity.class);
//                startActivity(intent);
//                getActivity().finish();
//
//            }
//        });


    }



    private void signIn() {
        //getting the google signin intent
        Intent signInIntent = mGoogleSignInClient.getSignInIntent();

        startActivityForResult.launch(signInIntent);

        // starting the activity for result

    }
    ActivityResultLauncher<Intent> startActivityForResult = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            new ActivityResultCallback<ActivityResult>() {
                @Override
                public void onActivityResult(ActivityResult result) {
                    if (result.getResultCode() == Activity.RESULT_OK){
                        Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(result.getData());
                        handleSignInResult(task);
                        try {
                            // Google Sign In was successful, authenticate with Firebase
                            GoogleSignInAccount account = task.getResult(ApiException.class);
                            Log.d(TAG, "firebaseAuthWithGoogle:" + account.getId());
                            firebaseAuthWithGoogle(account.getIdToken());
                        } catch (ApiException e) {
                            // Google Sign In failed, update UI appropriately
                            Log.w(TAG, "Google sign in failed", e);
                        }
                    }
                }
            }
    );
    private void handleSignInResult(Task<GoogleSignInAccount> completedTask) {
        try {
            GoogleSignInAccount acct = completedTask.getResult(ApiException.class);
            if (acct!= null)
            {
                String personName = acct.getDisplayName();
                String personGivenName = acct.getGivenName();
                String personFamilyName = acct.getFamilyName();
                String personEmail = acct.getEmail();
                String personId = acct.getId();
                Uri personPhoto = acct.getPhotoUrl();

                Toast.makeText(getContext(), "Email"+ personEmail, Toast.LENGTH_SHORT).show();


            }
            startActivity(new Intent(getContext() , MainActivity.class));
            // Signed in successfully, show authenticated UI.

        } catch (ApiException e) {
            // The ApiException status code indicates the detailed failure reason.
            // Please refer to the GoogleSignInStatusCodes class reference for more information.
            Log.w(TAG, "signInResult:failed code=" + e.getStatusCode());

        }
    }
    private void firebaseAuthWithGoogle(String idToken) {
        AuthCredential credential = GoogleAuthProvider.getCredential(idToken, null);
        auth.signInWithCredential(credential)
                .addOnCompleteListener( new OnCompleteListener<AuthResult>() {
                    @Override
                    public void onComplete(@NonNull Task<AuthResult> task) {
                        if (task.isSuccessful()) {
                            // Sign in success, update UI with the signed-in user's information
                            Log.d(TAG, "signInWithCredential:success");
                            FirebaseUser user = auth.getCurrentUser();

                        } else {
                            // If sign in fails, display a message to the user.
                            Log.w(TAG, "signInWithCredential:failure", task.getException());

                        }
                    }
                });
    }

//    @Override
//    public void onStart() {
//        super.onStart();
//        if (auth.getCurrentUser() != null) {
//
//            startActivity(new Intent(getContext(), MainActivity.class));
//        }
//    }
//
//    ActivityResultLauncher<Intent> someActivityResultLauncher = registerForActivityResult(
//            new ActivityResultContracts.StartActivityForResult(),
//            result -> {
//                if (result.getResultCode() == Activity.RESULT_OK) {
//                    // There are no request codes
//                    Intent data = result.getData();
//                    Task<GoogleSignInAccount> task = GoogleSignIn.getSignedInAccountFromIntent(data);
//        try {
//            //Google Sign In was successful, authenticate with Firebase
//            GoogleSignInAccount account = task.getResult(ApiException.class);
//
//            //authenticating with firebase
//            firebaseAuthWithGoogle(account.getIdToken());
//            Intent intent = new Intent(getContext(), MainActivity.class);
//            startActivity(intent);
//        } catch (ApiException e) {
//            Toast.makeText(getContext(), "wasn't successful" +task.getException().getMessage(), Toast.LENGTH_SHORT).show();
//        }
//                }
//            });
//
//
//
//    private void firebaseAuthWithGoogle(String idToken) {
//        AuthCredential credential = GoogleAuthProvider.getCredential(idToken, null);
//        auth.signInWithCredential(credential)
//                .addOnCompleteListener( new OnCompleteListener<AuthResult>() {
//                    @Override
//                    public void onComplete(@NonNull Task<AuthResult> task) {
//                        if (task.isSuccessful()) {
//                            // Sign in success, update UI with the signed-in user's information
//                            Log.d(TAG, "signInWithCredential:success");
//                            FirebaseUser user = auth.getCurrentUser();
//                            updateUI(user);
//                        } else {
//                            // If sign in fails, display a message to the user.
//                            Log.w(TAG, "signInWithCredential:failure", task.getException());
//                            updateUI(null);
//                        }
//                    }
//                });
//    }
//
//    private void updateUI(FirebaseUser user) {
//
//    }
//
//
//
//


    private void changeFragment(Fragment fragment) {
        FragmentTransaction fragmentTransaction = getActivity().getSupportFragmentManager().beginTransaction();
        fragmentTransaction.setCustomAnimations(R.anim.slide_in_left,R.anim.slide_out_right);
        fragmentTransaction.replace(parentFrameLayout.getId(), fragment);
        fragmentTransaction.commit(); }
}


