<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\Cart;
use Illuminate\Support\Facades\DB;
use \Illuminate\Support\Facades\Auth;


Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'product' => Product::where('status' , '=' , 1)->get(),
        'cart' => DB::select('SELECT SUM(quantity) as total_quantity
FROM carts
WHERE user_id = '.Auth::id()),
    ]);
})->middleware(['auth', 'verified']);

Route::get('/product/{id}', function ($id){
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'goback' => 1,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'cart' => DB::select('SELECT SUM(quantity) as total_quantity
FROM carts
WHERE user_id = '.Auth::id()),
        'product' => Product::where([
            ['status' , '=' , 1],
            ['id',$id],
        ])->get(),
    ]);
})->name('products.show')->middleware(['auth', 'verified']);


Route::get('/cart', function (){
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'goback' => 1,
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'cartItems' => DB::select('SELECT c.user_id, c.product_id, p.name, p.price, SUM(c.quantity) as total_quantity, p.price
FROM products p
JOIN carts c ON p.id = c.product_id
where c.quantity > 0
and c.user_id ='.Auth::id().'
GROUP BY p.id, p.name'),
        'displaycart' => 1,
        'countprice' => DB::select('SELECT SUM(c.quantity * c.price) AS total_money
FROM (
SELECT c.product_id, p.name, SUM(c.quantity) as quantity, p.price
FROM products p
JOIN carts c ON p.id = c.product_id
where c.quantity > 0
and c.user_id = '.Auth::id().'
GROUP BY p.id, p.name

) c '),
        'cart' => DB::select('SELECT SUM(quantity) as total_quantity
FROM carts
WHERE user_id = '.Auth::id()),
        'product' => Product::all()
    ]);
})->name('cart')->middleware(['auth', 'verified']);


Route::middleware('auth')->group(function () {

    Route::post('prodquantity/{id?}/{quantity?}', function ($id, $quantity) {
//        $product = Product::findOrFail($id);

//        DB::table("carts")
//            ->where(['product_id' => $id])
//            ->update(['quantity' => $quantity]);


        Cart::where('product_id', $id)
            ->where('user_id', auth::id())
            ->update(['quantity' => $quantity]);
    })->name('setCartProductQuantity');

    Route::post('del/{id}', function ($id){

        Cart::where('product_id', $id)
            ->where('user_id', auth()->id())
            ->delete();
    })->name('delcart');
});

Route::post('/addProductInCart{id}',function ($id){
    $product = Cart::where(
     [
         [
             'product_id', $id
         ],
         [
             'user_id', Auth::id()
         ]
     ]
    )->first();

    if ($product) {
        $product->increment('quantity', 1);
    } else {
        Cart::create([
            'user_id'=>Auth::id(),
            'product_id' => $id,
            'quantity' => 1,
        ]);
    }
})->name('product.add')->middleware(['auth', 'verified']);

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
