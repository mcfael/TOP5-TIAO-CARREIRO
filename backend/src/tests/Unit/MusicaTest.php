<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Musica;

class MusicaTest extends TestCase
{
    use RefreshDatabase;

    public function test_listar_musicas()
    {
        Musica::factory()->count(3)->create();

        $response = $this->getJson('/api/musicas');

        $response->assertStatus(200)
                 ->assertJsonCount(3);
    }

    public function test_criar_musica_autenticado()
    {
        $user = User::factory()->create();
        $token = $user->createToken('api')->plainTextToken;

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token"
        ])->postJson('/api/musicas', [
            'titulo' => 'Minha Música',
            'artista' => 'Artista X'
        ]);

        $response->assertStatus(201)
                 ->assertJsonFragment(['titulo' => 'Minha Música']);
    }

    public function test_atualizar_musica()
    {
        $user = User::factory()->create();
        $token = $user->createToken('api')->plainTextToken;

        $musica = Musica::factory()->create([
            'titulo' => 'Antigo',
            'artista' => 'Artista A'
        ]);

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token"
        ])->putJson("/api/musicas/{$musica->id}", [
            'titulo' => 'Atualizado',
            'artista' => 'Artista B'
        ]);

        $response->assertStatus(200)
                 ->assertJsonFragment(['titulo' => 'Atualizado']);
    }

    public function test_deletar_musica()
    {
        $user = User::factory()->create();
        $token = $user->createToken('api')->plainTextToken;

        $musica = Musica::factory()->create();

        $response = $this->withHeaders([
            'Authorization' => "Bearer $token"
        ])->deleteJson("/api/musicas/{$musica->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('musicas', ['id' => $musica->id]);
    }
}
