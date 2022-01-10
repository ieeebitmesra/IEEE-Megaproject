package com.example.sarvasva.app.fragments;

import android.content.DialogInterface;
import android.content.Intent;
import android.os.Bundle;

import androidx.activity.OnBackPressedCallback;
import androidx.cardview.widget.CardView;
import androidx.fragment.app.Fragment;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.example.sarvasva.R;
import com.example.sarvasva.app.activities.AuthenticationActivity;
import com.example.sarvasva.app.activities.MainActivity;

/**
 * A simple {@link Fragment} subclass.
 * Use the {@link Colledge_directory_page#newInstance} factory method to
 * create an instance of this fragment.
 */
public class Colledge_directory_page extends Fragment implements View.OnClickListener{

    // TODO: Rename parameter arguments, choose names that match
    // the fragment initialization parameters, e.g. ARG_ITEM_NUMBER
    private static final String ARG_PARAM1 = "param1";
    private static final String ARG_PARAM2 = "param2";

    // TODO: Rename and change types of parameters
    private String mParam1;
    private String mParam2;

    private LinearLayout topofficial;
    private LinearLayout dean;
    private LinearLayout otherofficial;
    private LinearLayout hod;
    private LinearLayout associatedean ;
    private LinearLayout iqac ;
    private LinearLayout administration;
    private LinearLayout dispensary ;
    private LinearLayout accountpur;
    private LinearLayout examination ;
    private LinearLayout hostelwarden;

    public Colledge_directory_page() {
        // Required empty public constructor
    }

    /**
     * Use this factory method to create a new instance of
     * this fragment using the provided parameters.
     *
     * @param param1 Parameter 1.
     * @param param2 Parameter 2.
     * @return A new instance of fragment Colledge_directory_page.
     */
    // TODO: Rename and change types and number of parameters
    public static Colledge_directory_page newInstance(String param1, String param2) {
        Colledge_directory_page fragment = new Colledge_directory_page();
        Bundle args = new Bundle();
        args.putString(ARG_PARAM1, param1);
        args.putString(ARG_PARAM2, param2);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            mParam1 = getArguments().getString(ARG_PARAM1);
            mParam2 = getArguments().getString(ARG_PARAM2);
        }


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



    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view= inflater.inflate(R.layout.fragment_colledge_directory_page, container, false);


        topofficial= (LinearLayout) view.findViewById(R.id.TopOfficial);
        topofficial.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new Colledge_Directory_bitmesra());
            }
        });
        dean= (LinearLayout) view.findViewById(R.id.dean);
        dean.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new DeanFragment());
            }
        });

        iqac= (LinearLayout) view.findViewById(R.id.iqac);
        iqac.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new Directory_IQAC());
            }
        });

        otherofficial= (LinearLayout) view.findViewById(R.id.otherofficials);
        otherofficial.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new Other_officials());
            }
        });

        hod= (LinearLayout) view.findViewById(R.id.hod);
        hod.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new HOD());
            }
        });

        hostelwarden= (LinearLayout) view.findViewById(R.id.warden);
        hostelwarden.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new Hostel_Warden_page());
            }
        });

        dispensary= (LinearLayout) view.findViewById(R.id.dispensary);
        dispensary.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new Dispensary());
            }
        });

        accountpur= (LinearLayout) view.findViewById(R.id.accountandpur);
        accountpur.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new Account_and_purchase());
            }
        });

        associatedean= (LinearLayout) view.findViewById(R.id.associatedean);
        associatedean.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new Associate_Deans());
            }
        });

        administration= (LinearLayout) view.findViewById(R.id.administration);
        administration.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                changeFragment(new Administration_page());
            }
        });


//        dean.setOnClickListener(new View.OnClickListener() {
//            @Override
//            public void onClick(View view) {
//                changeFragment(new DeanFragment());
//            }
//        });

        return view;
    }
    private void changeFragment(Fragment fragment) {
        FragmentTransaction fragmentTransaction = getParentFragmentManager().beginTransaction();
        fragmentTransaction.setCustomAnimations(R.anim.fui_slide_in_right,R.anim.fui_slide_out_left);
        fragmentTransaction.replace(R.id.main_activity_frame_layout, fragment);
        fragmentTransaction.addToBackStack(null).commit(); }

    @Override
    public void onClick(View view) {

        switch (view.getId())
        {
            case R.id.TopOfficial:
                changeFragment(new Colledge_Directory_bitmesra());
                break;
            case R.id.dean:
                changeFragment(new DeanFragment());
                break;
        }

    }
}