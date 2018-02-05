<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInit0d8764703c27a5f7c555c2892a14b720
{
    public static $prefixLengthsPsr4 = array (
        'S' => 
        array (
            'SoftLayer\\' => 10,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'SoftLayer\\' => 
        array (
            0 => __DIR__ . '/../..' . '/src',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInit0d8764703c27a5f7c555c2892a14b720::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInit0d8764703c27a5f7c555c2892a14b720::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}