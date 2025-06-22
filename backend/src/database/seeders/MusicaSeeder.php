<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MusicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        \App\Models\Musica::insert([
            ['titulo' => 'Pagode em Brasília', 'youtube_url' => 'https://www.youtube.com/watch?v=lpGGNA6_920', 'aprovada' => true],
            ['titulo' => 'Chico Mineiro', 'youtube_url' => 'https://www.youtube.com/watch?v=oSADrBSfKl0', 'aprovada' => true],
            ['titulo' => 'Rei do Gado', 'youtube_url' => 'https://www.youtube.com/watch?v=bv3593lmltY', 'aprovada' => true],
            ['titulo' => 'Boi soberano', 'youtube_url' => 'https://www.youtube.com/watch?v=3ZFO_0PFuHI', 'aprovada' => true],
            ['titulo' => 'Chora viola', 'youtube_url' => 'https://www.youtube.com/watch?v=7ODUHvbqcNs', 'aprovada' => true],
        ]);
    }

}
