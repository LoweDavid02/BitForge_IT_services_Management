<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('feedbacks', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email');
            $table->foreignId('service_id')->constrained()->onDelete('cascade');
            $table->string('service_name');
            $table->smallInteger('rating');
            $table->text('message');
            $table->enum('status', ['new', 'in-progress', 'resolved'])->default('new');
            $table->string('avatar_initials')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('feedbacks');
    }
};
