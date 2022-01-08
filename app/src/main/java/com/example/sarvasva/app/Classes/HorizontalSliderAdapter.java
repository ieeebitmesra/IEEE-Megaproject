package com.example.sarvasva.app.Classes;

import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.bumptech.glide.Glide;
import com.example.sarvasva.R;

import java.util.List;

public class HorizontalSliderAdapter extends RecyclerView.Adapter<HorizontalSliderAdapter.ViewHolder> {

    private List<String >list;

    public HorizontalSliderAdapter(List<String> list) {
        this.list = list;
    }

    @NonNull
    @Override
    public HorizontalSliderAdapter.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.horizontal_product_layout , parent, false);


        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.setData(list.get(position)) ;
    }




    @Override
    public int getItemCount() {
        return list.size();
    }


    public class ViewHolder extends RecyclerView.ViewHolder {

        private ImageView imageView;



        public ViewHolder(@NonNull  View itemView) {
            super(itemView);
            imageView = itemView.findViewById(R.id.productImageView);



        }
        public void setData(String url)
        {
            Glide.with(itemView.getContext()).load(url).into(imageView);
        }

    }

//   public class ViewHolder extends RecyclerView.ViewHolder{
//
//       public ImageView imageView;
//
//       public ViewHolder(@NonNull View itemView) {
//           super(itemView);
//            imageView  = itemView.findViewById(R.id.productImageView);
//       }
//         public  void  setNewData(String url) {
//         Glide.with(itemView.getContext()).load(url).into(imageView);
//          }
//    }

}