package com.example.sarvasva.app.fragments;

import android.content.Intent;
import android.os.Bundle;

import androidx.activity.OnBackPressedCallback;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.ImageView;
import android.widget.LinearLayout;

import com.example.sarvasva.R;
import com.example.sarvasva.app.activities.MainActivity;
import com.example.sarvasva.app.fragments.clubProfiles.ACMProfile;
import com.example.sarvasva.app.fragments.clubProfiles.AveonProfile;
import com.example.sarvasva.app.fragments.clubProfiles.EhsaasProfile;
import com.example.sarvasva.app.fragments.clubProfiles.EpacProfile;
import com.example.sarvasva.app.fragments.clubProfiles.FireboltProfile;
import com.example.sarvasva.app.fragments.clubProfiles.GDSC;
import com.example.sarvasva.app.fragments.clubProfiles.IEEEProfile;
import com.example.sarvasva.app.fragments.clubProfiles.IEICivilProfile;
import com.example.sarvasva.app.fragments.clubProfiles.IETEProfile;
import com.example.sarvasva.app.fragments.clubProfiles.IETProfile;
import com.example.sarvasva.app.fragments.clubProfiles.LITSOCProfile;
import com.example.sarvasva.app.fragments.clubProfiles.SDSProfile;
import com.example.sarvasva.app.fragments.clubProfiles.SrijanProfile;
import com.example.sarvasva.app.fragments.clubProfiles.UNESQUOProfile;


public class ClubDirectory extends Fragment implements View.OnClickListener {
    private FrameLayout parentFrameLayout;
    private CardView Card;
    FragmentTransaction fragmentTransaction;



    public ClubDirectory() {
        // Required empty public constructor
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {


        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_club_directory, container, false);



        Card = (CardView) view.findViewById(R.id.edc);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new ClubsProfile());
            }
        });


        Card = (CardView) view.findViewById(R.id.aveon);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new AveonProfile());
             }
        });


        Card = (CardView) view.findViewById(R.id.gdsc);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new GDSC());
             }
        });

        Card = (CardView) view.findViewById(R.id.firebolt);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new FireboltProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.acm);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new ACMProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.ehsaas);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new EhsaasProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.epac);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new EpacProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.ieee);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new IEEEProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.iei);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new IEICivilProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.iete);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new IETEProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.iet);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new IETProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.litsoc);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new LITSOCProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.sds);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new SDSProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.srijan);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new SrijanProfile());
             }
        });

        Card = (CardView) view.findViewById(R.id.unesquo);
        Card.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                        changeFragment(new UNESQUOProfile());
             }
        });


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


    private void changeFragment(Fragment fragment) {
        fragmentTransaction = getParentFragmentManager().beginTransaction();
        fragmentTransaction.setCustomAnimations(R.anim.fui_slide_in_right,R.anim.fui_slide_out_left);
        fragmentTransaction.replace(R.id.main_activity_frame_layout, fragment);
        fragmentTransaction.addToBackStack(null).commit(); }


    @Override
    public void onClick(View view) {

    }
}
