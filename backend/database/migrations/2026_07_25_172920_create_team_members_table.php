<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role', 150);
            $table->enum('department', ['Management', 'Design', 'Development', 'QA']);
            $table->boolean('is_featured')->default(false);
            $table->text('image_url')->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('email', 255)->nullable();
            $table->text('portfolio_url')->nullable();
            $table->enum('access_level', ['ADMIN', 'DEVELOPER', 'QA'])->nullable();
            $table->date('last_modified')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('team_members');
    }
};
