<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('role', 50)->default('admin')->after('password');
            $table->string('phone', 50)->nullable()->after('role');
            $table->string('department', 100)->nullable()->after('phone');
            $table->string('location', 255)->nullable()->after('department');
            $table->text('bio')->nullable()->after('location');
            $table->text('avatar')->nullable()->after('bio');
            $table->string('initials', 5)->nullable()->after('avatar');
            $table->date('join_date')->nullable()->after('initials');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['role', 'phone', 'department', 'location', 'bio', 'avatar', 'initials', 'join_date']);
        });
    }
};
