<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $arr = [
            [
                'name' => 'product1',
                'description' => 'adasdasdasdasd',
                'price' => 10,
                'status' => 1,
            ],
            [
                'name' => 'product2',
                'description' => 'adasdasdasdasd',
                'price' => 20,
                'status' => 1,
            ],
            [
                'name' => 'product1',
                'description' => 'adasdasdasdasd',
                'price' => 30,
                'status' => 1,
            ],
            [
                'name' => 'product1',
                'description' => 'adasdasdasdasd',
                'price' => 15,
                'status' => 1,
            ]
        ];
        foreach ($arr as $key => $val){
            Product::create($val);
        }
    }
}
