<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        //$this->call(Adminton::class);
        $this->call(DatabasePopulator::class);
        $this->call(PagesSeeder::class);
        //$this->call(PageViewSeeder::class);
        $this->call(ContactMessageSeeder::class);
    }
}
