"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import SiteContext from "@/context/site";
import AuthContext from "@/context/auth";
import { renderToString } from "react-dom/server";
import OpenAI from "openai";
import { IoLogoInstagram, IoLogoYoutube, IoLogoTiktok } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";

const AppearanceContext = createContext();
export const AppearanceProvider = ({ children }) => {
  const { userSite } = useContext(SiteContext);
  const { userData } = useContext(AuthContext);

  const [currentStep, setCurrentStep] = useState(1);

  const [profileTitle, setProfileTitle] = useState();
  const [slug, setSlug] = useState();
  const [about, setAbout] = useState();
  const [theme, setTheme] = useState();
  const [location, setLocation] = useState();
  const [experience, setExperience] = useState();

  const [loading, setLoading] = useState(false);

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState();

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");

  useEffect(() => {
    setProfileTitle(userSite?.title);

    setAbout(userSite?.about);

    setSkills(userSite?.skills);
    setAvatar(userSite?.avatar?.url);

    setTheme({
      isGradient: userSite?.theme?.isGradient || true,
      gradient: {
        from: userSite?.theme?.gradient.from || "",
        to: userSite?.theme?.gradient.to || "",
        dir: userSite?.theme?.gradient.dir || "",
      },
      bgColor: userSite?.theme?.bgColor || "",
      AvatarBgColor: userSite?.theme?.AvatarBgColor || "",
      isParticles: userSite?.theme?.isParticles || true,
      linksBgColor: userSite?.theme?.linksBgColor || "",
      HeadersBgColor: userSite?.theme?.HeadersBgColor || "",
      linksBgStyle: userSite?.theme?.linksBgStyle || "",
      HeadersBgStyle: userSite?.theme?.HeadersBgStyle || "",
    });

    const getSocials = () => {
      const socialsCopy = { ...socials };
      userSite?.social.forEach((data) => {
        const { platform, username } = data;
        if (platforms[platform]) {
          socialsCopy[platform] = {
            username,
            url: platforms[platform].baseUrl + username,
          };
        }
      });

      setSocials(socialsCopy);
    };

    getSocials();
  }, [userSite]);

  const platforms = {
    instagram: {
      baseUrl: "instagram.com/",
      icon: <IoLogoInstagram />,
    },
    youtube: {
      baseUrl: "youtube.com/",
      icon: <IoLogoYoutube />,
    },
    tiktok: {
      baseUrl: "tiktok.com/",
      icon: <IoLogoTiktok />,
    },
    x: {
      baseUrl: "x.com/",
      icon: <BsTwitterX />,
    },
  };

  const initialSocialValues = Object.keys(platforms).reduce((acc, platform) => {
    acc[platform] = { username: "", url: platforms[platform].baseUrl };
    return acc;
  }, {});

  const [socials, setSocials] = useState(initialSocialValues);

  // ---------------------  socials functions

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;

  //   const baseUrl = platforms[name].baseUrl;

  //   setSocials({
  //     ...socials,
  //     [name]: baseUrl + value.replace(baseUrl, ""),
  //   });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const baseUrl = platforms[name].baseUrl;

    setSocials((prevSocials) => ({
      ...prevSocials,
      [name]: {
        username: value,
        url: baseUrl + value.replace(baseUrl, ""),
      },
    }));
  };

  useEffect(() => {
    if (userData) {
      setProfileTitle(userData.username);
      setSlug(userData.username);
    }
  }, [currentStep]);

  const convertValuesToPayload = (values) => {
    const filteredValues = [];

    for (const [platform, data] of Object.entries(values)) {
      if (checkForUsername(data.url)) {
        filteredValues.push({
          platform,
          url: data.url,
          username: data.username,
          icon: renderToString(platforms[platform]?.icon) || "",
        });
      }
    }

    return filteredValues;
  };

  const checkForUsername = (url) => {
    const regex = /\.com\/([^/]+)/i;
    return regex.test(url);
  };

  // const convertValuesToPayload = (values) => {
  //   const filteredValues = [];

  //   for (const [platform, url] of Object.entries(values)) {
  //     console.log(filteredValues);
  //     if (checkForUsername(url)) {
  //       filteredValues.push({
  //         platform,
  //         url,
  //         icon: renderToString(platforms[platform]?.icon) || "", // Ensure renderToString is defined and used correctly
  //       });
  //     }
  //   }

  //   return filteredValues;
  // };

  // const checkForUsername = (url) => {
  //   // Define the regex pattern to match any path segment after the domain name
  //   const regex = /\.com\/([^/]+)/i;
  //   // Test the URL against the regex pattern
  //   return regex.test(url);
  // };

  // ---------------------  content functions

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState({
    category: null,
    sub: null,
  });

  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_SEC_KEY,
    dangerouslyAllowBrowser: true,
  });

  let main = async () => {
    setLoading(true);
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: `write a short bio with 30 words for me i have these skill : ${
            (selectedCategory, selectedSubCategory)
          } . and don't write my name`,
        },
      ],
      temperature: 0.5,
      max_tokens: 256,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });
    setAbout(completion.choices[0].message.content);
    setLoading(false);
  };

  // ---------------------  submit functions

  const onAvatarChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
      }
    };
    setAvatar(e.target.files[0]);
    console.log(avatar);
    reader.readAsDataURL(e.target.files[0]);
  };

  const nextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <AppearanceContext.Provider
      value={{
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
        handleInputChange,
        convertValuesToPayload,
        selectedCategory,
        setSelectedCategory,
        selectedSubCategory,
        setSelectedSubCategory,
        main,
        onAvatarChange,
        nextStep,
        prevStep,
        platforms,
        currentStep,
        setCurrentStep,
        initialSocialValues,
        socials,
        setSocials,
        skills,
        setSkills,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppearanceContext.Provider>
  );
};

export default AppearanceContext;
