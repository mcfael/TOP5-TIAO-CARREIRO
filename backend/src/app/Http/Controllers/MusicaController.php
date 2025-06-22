<?php

namespace App\Http\Controllers;

use App\Models\Musica;
use Illuminate\Http\Request;

class MusicaController extends Controller
{
    public function index(Request $request)
    {
        /*$limit = $request->query('limit', 5);

        $musicas = Musica::where('aprovada', true)
                    ->orderBy('created_at', 'desc')
                    ->paginate($limit);

        return response()->json($musicas);*/
        try {
            $query = Musica::query();

            // Filtra por aprovação, se o parâmetro estiver presente
            if ($request->has('aprovada')) {
                $isApproved = filter_var($request->query('aprovada'), FILTER_VALIDATE_BOOLEAN);
                $query->where('aprovada', $isApproved);
            }
            
            //$musicas = $query->get();
            #$onlimit= $request->has('limit');
            $limit = $request->query('limit', 5);
            $musicas = $query->orderBy('created_at', 'desc')->paginate($limit);
            return response()->json([
                'success' => true,
                'data' => $musicas->items(),
                'meta' => [
                'current_page' => $musicas->currentPage(),
                'last_page' => $musicas->lastPage(),
                'per_page' => $musicas->perPage(),
                'total' => $musicas->total()
                ],
                'message' => 'Lista de músicas carregada com sucesso.'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'message' => 'Erro ao buscar músicas.'
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'titulo' => 'required|string|max:255',
                'youtube_url' => [
                    'required',
                    'url',
                    'regex:/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/'
                ],
                'views' => 'sometimes|integer|min:0'
            ]);

            $musica = Musica::create([
                'titulo' => $validated['titulo'],
                'youtube_url' => $validated['youtube_url'],
                'views' => $validated['views'] ?? 0,
                'aprovada' => false
            ]);

            return response()->json([
                'success' => true,
                'data' => $musica,
                'message' => 'Música cadastrada com sucesso!'
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors(),
                'message' => 'Erro de validação'
            ], 422);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'message' => 'Erro interno no servidor'
            ], 500);
        }
    }
    public function update(Request $request, $id)
    {
        try {
            $validated = $request->validate([
                'titulo' => 'sometimes|required|string|max:255',
                'youtube_url' => [
                    'sometimes',
                    'required',
                    'url',
                    'regex:/^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/'
                ],
                'views' => 'sometimes|integer|min:0',
                'aprovada' => 'sometimes|boolean'
            ]);

            $musica = Musica::find($id);

            if (!$musica) {
                return response()->json([
                    'success' => false,
                    'message' => 'Música não encontrada'
                ], 404);
            }

            $musica->update($validated);

            return response()->json([
                'success' => true,
                'data' => $musica,
                'message' => 'Música atualizada com sucesso!'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'errors' => $e->errors(),
                'message' => 'Erro de validação'
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
                'message' => 'Erro interno no servidor'
            ], 500);
        }
    }
    public function destroy($id)
    {
        Musica::destroy($id);
        return response()->json(['message' => 'Música excluída']);
    }
}
