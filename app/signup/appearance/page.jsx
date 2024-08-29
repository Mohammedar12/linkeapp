"use client";

import Social from "@/components/Startup/socials";
import Appearance from "@/components/Startup/appearance";
import Content from "@/components/Startup/content";
import Skills from "@/components/Startup/skills";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context/auth";
import AppearanceContext from "@/context/appearance";

export default function page() {
  const { createSite } = useContext(AuthContext);
  const {
    handleInputChange,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    convertValuesToPayload,
    main,
    onAvatarChange,
    nextStep,
    prevStep,
    socials,
    currentStep,
    platforms,
    initialSocialValues,
    profileTitle,
    setProfileTitle,
    slug,
    setSlug,
    about,
    setAbout,
    loading,
    setLoading,
    avatar,
    setAvatar,
    avatarPreview,
    setAvatarPreview,
    skills,
    setSkills,
    newSkill,
    setNewSkill,
    addSkill,
    removeSkill,
  } = useContext(AppearanceContext);

  const submitHandler = (e) => {
    e.preventDefault();

    const payload = convertValuesToPayload(socials);

    const formData = new FormData();
    formData.set("slug", slug);
    formData.set("title", profileTitle);
    formData.set("social", JSON.stringify(payload));
    formData.set("about", about);
    formData.set("avatar", avatar);
    formData.set("skills", JSON.stringify(skills));

    console.log(formData);

    createSite(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <Content
              nextStep={nextStep}
              setAbout={setAbout}
              genreate={main}
              selectedCategory={selectedCategory}
              selectedSubCategory={selectedSubCategory}
              setSelectedCategory={setSelectedCategory}
              setSelectedSubCategory={setSelectedSubCategory}
            />
          </>
        );
      case 2:
        return (
          <Skills
            prevStep={prevStep}
            nextStep={nextStep}
            skills={skills}
            setSkills={setSkills}
            newSkill={newSkill}
            setNewSkill={setNewSkill}
            addSkill={addSkill}
            removeSkill={removeSkill}
          />
        );
      case 3:
        return (
          <Social
            prevStep={prevStep}
            nextStep={nextStep}
            values={socials}
            platforms={platforms}
            initialSocialValues={initialSocialValues}
            handleInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <Appearance
            nextStep={nextStep}
            prevStep={prevStep}
            submitHandler={submitHandler}
            profileTitle={profileTitle}
            setProfileTitle={setProfileTitle}
            about={about}
            setAbout={setAbout}
            genreate={main}
            onAvatarChange={onAvatarChange}
            avatar={avatarPreview}
            setAvatar={setAvatar}
            loading={loading}
          />
        );
      // Add more cases for additional steps if necessary
      default:
        return <Content />;
    }
  };

  return (
    <main className="flex min-h-screen gap w-full items-center justify-center bg-gray-100 px-4 py-12 dark:bg-gray-900 sm:px-6 lg:px-8">
      {renderStep()}
    </main>
  );
}
