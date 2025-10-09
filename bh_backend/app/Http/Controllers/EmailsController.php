<?php

namespace App\Http\Controllers;

use App\Models\Emails;
use Illuminate\Http\Request;

class EmailsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255|unique:emails,email',
        ]);

        $emails = Emails::create([
            'email' => $request->email,
        ]);

        return response()->json([
                'success' => true,
                'message' => 'Email enregistré avec succès',
                'category' => $emails
        ]);
    }



    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Emails  $emails
     * @return \Illuminate\Http\Response
     */
    public function show(Emails $emails)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Emails  $emails
     * @return \Illuminate\Http\Response
     */
    public function edit(Emails $emails)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Emails  $emails
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Emails $emails)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Emails  $emails
     * @return \Illuminate\Http\Response
     */
    public function destroy(Emails $emails)
    {
        //
    }
}
