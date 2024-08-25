plugins {
    alias(libs.plugins.android.application)
}

android {
    namespace = "web.bmdominatezz.gravy"
    compileSdk = 34

    defaultConfig {
        applicationId = "web.bmdominatezz.gravy"
        minSdk = 26
        targetSdk = 34
        versionCode = 22 //011
        versionName = "0.2.2-beta.2"

        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
            signingConfig = signingConfigs.getByName("debug")
        }
    }
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_1_8
        targetCompatibility = JavaVersion.VERSION_1_8
    }
}

dependencies {

    implementation(libs.appcompat)
    implementation(libs.material)
    implementation(libs.activity)
    implementation(libs.constraintlayout)
    implementation(libs.webkit)
    testImplementation(libs.junit)
    androidTestImplementation(libs.ext.junit)
    androidTestImplementation(libs.espresso.core)
// https://mvnrepository.com/artifact/org.mozilla.geckoview/geckoview
    implementation("org.mozilla.geckoview:geckoview:129.0.20240819150008")
}