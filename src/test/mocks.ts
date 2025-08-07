import { PhotoResponse } from "../api/types";

export const mockResponse: { images: PhotoResponse[]; totalPages: number } = {
  totalPages: 3,
  images: [
    {
      id: "7GX5aICb5i4",
      slug: "brown-tabby-cat-7GX5aICb5i4",
      alternative_slugs: {
        en: "brown-tabby-cat-7GX5aICb5i4",
        es: "gato-atigrado-marron-7GX5aICb5i4",
        ja: "茶色のぶち猫-7GX5aICb5i4",
        fr: "chat-tigre-brun-7GX5aICb5i4",
        it: "gatto-soriano-marrone-7GX5aICb5i4",
        ko: "갈색-줄무늬-고양이-7GX5aICb5i4",
        de: "braun-getigerte-katze-7GX5aICb5i4",
        pt: "gato-tabby-marrom-7GX5aICb5i4",
        id: "kucing-tabby-coklat-7GX5aICb5i4",
      },
      created_at: "2018-12-03T15:59:55Z",
      updated_at: "2025-08-05T16:01:39Z",
      promoted_at: "2018-12-04T06:34:49Z",
      width: 4000,
      height: 6000,
      color: "#c0a6a6",
      blur_hash: "LGJHN^%2kD01~W4nt8xu?w%2xusl",
      description: "bean the cat",
      alt_description: "brown tabby cat",
      breadcrumbs: [],
      urls: {
        raw: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwxfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwxfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1543852786-1cf6624b9987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwxfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1543852786-1cf6624b9987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwxfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1543852786-1cf6624b9987?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwxfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1543852786-1cf6624b9987",
      },
      links: {
        self: "https://api.unsplash.com/photos/brown-tabby-cat-7GX5aICb5i4",
        html: "https://unsplash.com/photos/brown-tabby-cat-7GX5aICb5i4",
        download:
          "https://unsplash.com/photos/7GX5aICb5i4/download?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwxfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww",
        download_location:
          "https://api.unsplash.com/photos/7GX5aICb5i4/download?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwxfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww",
      },
      likes: 2183,
      liked_by_user: false,
      current_user_collections: [],
      sponsorship: null,
      topic_submissions: {
        animals: {
          status: "approved",
          approved_on: "2020-04-06T14:20:16Z",
        },
      },
      asset_type: "photo",
      user: {
        id: "s7H6D5HRE-o",
        updated_at: "2024-10-31T04:46:08Z",
        username: "jaehunpark",
        name: "Jae Park",
        first_name: "Jae",
        last_name: "Park",
        twitter_username: null,
        portfolio_url: "http://instagram.com/jaehun.park",
        bio: "30 million+ views & 150 thousand+ downloads\r\nthank you  okfourok@gmail.com",
        location: "Edmonton, Alberta",
        links: {
          self: "https://api.unsplash.com/users/jaehunpark",
          html: "https://unsplash.com/@jaehunpark",
          photos: "https://api.unsplash.com/users/jaehunpark/photos",
          likes: "https://api.unsplash.com/users/jaehunpark/likes",
          portfolio: "https://api.unsplash.com/users/jaehunpark/portfolio",
          following: "https://api.unsplash.com/users/jaehunpark/following",
          followers: "https://api.unsplash.com/users/jaehunpark/followers",
        },
        profile_image: {
          small:
            "https://images.unsplash.com/profile-1535352693904-8f6173683f9d?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
          medium:
            "https://images.unsplash.com/profile-1535352693904-8f6173683f9d?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
          large:
            "https://images.unsplash.com/profile-1535352693904-8f6173683f9d?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
        },
        instagram_username: "jaehun.park",
        total_collections: 0,
        total_likes: 11,
        total_photos: 32,
        total_promoted_photos: 5,
        total_illustrations: 0,
        total_promoted_illustrations: 0,
        accepted_tos: true,
        for_hire: true,
        social: {
          instagram_username: "jaehun.park",
          portfolio_url: "http://instagram.com/jaehun.park",
          twitter_username: null,
          paypal_email: null,
        },
      },
    },
    {
      id: "ZCHj_2lJP00",
      slug: "white-and-brown-long-fur-cat-ZCHj_2lJP00",
      alternative_slugs: {
        en: "white-and-brown-long-fur-cat-ZCHj_2lJP00",
        es: "gato-de-pelaje-largo-blanco-y-marron-ZCHj_2lJP00",
        ja: "白と茶色の長い毛皮の猫-ZCHj_2lJP00",
        fr: "chat-a-longue-fourrure-blanc-et-brun-ZCHj_2lJP00",
        it: "gatto-a-pelo-lungo-bianco-e-marrone-ZCHj_2lJP00",
        ko: "흰색과-갈색-긴-모피-고양이-ZCHj_2lJP00",
        de: "weisse-und-braune-langfellkatze-ZCHj_2lJP00",
        pt: "gato-de-pelo-longo-branco-e-marrom-ZCHj_2lJP00",
        id: "kucing-bulu-panjang-putih-dan-coklat-ZCHj_2lJP00",
      },
      created_at: "2020-06-15T04:30:27Z",
      updated_at: "2025-08-05T13:33:53Z",
      promoted_at: "2020-06-15T08:16:29Z",
      width: 5304,
      height: 7952,
      color: "#a6d9d9",
      blur_hash: "LRJcqDIUL3s..mX8rXRPOZnirWXT",
      description: null,
      alt_description: "white and brown long fur cat",
      breadcrumbs: [],
      urls: {
        raw: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwyfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwyfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwyfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwyfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwyfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1592194996308-7b43878e84a6",
      },
      links: {
        self: "https://api.unsplash.com/photos/white-and-brown-long-fur-cat-ZCHj_2lJP00",
        html: "https://unsplash.com/photos/white-and-brown-long-fur-cat-ZCHj_2lJP00",
        download:
          "https://unsplash.com/photos/ZCHj_2lJP00/download?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwyfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww",
        download_location:
          "https://api.unsplash.com/photos/ZCHj_2lJP00/download?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwyfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww",
      },
      likes: 2545,
      liked_by_user: false,
      current_user_collections: [],
      sponsorship: null,
      topic_submissions: {
        animals: {
          status: "approved",
          approved_on: "2020-06-16T11:38:49Z",
        },
        wallpapers: {
          status: "approved",
          approved_on: "2021-04-23T10:55:04Z",
        },
      },
      asset_type: "photo",
      user: {
        id: "1LMzZNX562k",
        updated_at: "2025-07-16T01:18:58Z",
        username: "alvannee",
        name: "Alvan Nee",
        first_name: "Alvan",
        last_name: "Nee",
        twitter_username: "Alvan Nee",
        portfolio_url: null,
        bio: "I really love unsplash！！！！！",
        location: "Shanghai, China",
        links: {
          self: "https://api.unsplash.com/users/alvannee",
          html: "https://unsplash.com/@alvannee",
          photos: "https://api.unsplash.com/users/alvannee/photos",
          likes: "https://api.unsplash.com/users/alvannee/likes",
          portfolio: "https://api.unsplash.com/users/alvannee/portfolio",
        },
        profile_image: {
          small:
            "https://images.unsplash.com/profile-1749171262932-cc708225d9ff?ixlib=rb-4.1.0&crop=faces&fit=crop&w=32&h=32",
          medium:
            "https://images.unsplash.com/profile-1749171262932-cc708225d9ff?ixlib=rb-4.1.0&crop=faces&fit=crop&w=64&h=64",
          large:
            "https://images.unsplash.com/profile-1749171262932-cc708225d9ff?ixlib=rb-4.1.0&crop=faces&fit=crop&w=128&h=128",
        },
        instagram_username: "alvan_nee",
        total_collections: 0,
        total_likes: 69,
        total_photos: 120,
        total_promoted_photos: 23,
        total_illustrations: 0,
        total_promoted_illustrations: 0,
        accepted_tos: true,
        for_hire: true,
        social: {
          instagram_username: "alvan_nee",
          portfolio_url: null,
          twitter_username: "Alvan Nee",
          paypal_email: null,
        },
      },
    },
    {
      id: "IbPxGLgJiMI",
      slug: "selective-focus-photo-of-gray-tabby-cat-IbPxGLgJiMI",
      alternative_slugs: {
        en: "selective-focus-photo-of-gray-tabby-cat-IbPxGLgJiMI",
        es: "foto-de-enfoque-selectivo-de-gato-atigrado-gris-IbPxGLgJiMI",
        ja: "灰色のぶち猫のセレクティブフォーカス写真-IbPxGLgJiMI",
        fr: "photo-de-mise-au-point-selective-de-chat-tigre-gris-IbPxGLgJiMI",
        it: "foto-a-fuoco-selettiva-del-gatto-soriano-grigio-IbPxGLgJiMI",
        ko: "회색-줄무늬-고양이의-선택적-초점-사진-IbPxGLgJiMI",
        de: "selektives-fokusfoto-einer-grau-getigerten-katze-IbPxGLgJiMI",
        pt: "foto-de-foco-seletivo-do-gato-tabby-cinza-IbPxGLgJiMI",
        id: "foto-fokus-selektif-kucing-tabby-abu-abu-IbPxGLgJiMI",
      },
      created_at: "2018-02-16T14:38:24Z",
      updated_at: "2025-08-05T12:16:36Z",
      promoted_at: "2018-02-17T12:25:40Z",
      width: 4272,
      height: 2848,
      color: "#c0c0c0",
      blur_hash: "LHJkff=|_Nt8~CITIUxa_4t8D%s.",
      description: null,
      alt_description: "selective focus photo of gray tabby cat",
      breadcrumbs: [],
      urls: {
        raw: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwzfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwzfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwzfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwzfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwzfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1518791841217-8f162f1e1131",
      },
      links: {
        self: "https://api.unsplash.com/photos/selective-focus-photo-of-gray-tabby-cat-IbPxGLgJiMI",
        html: "https://unsplash.com/photos/selective-focus-photo-of-gray-tabby-cat-IbPxGLgJiMI",
        download:
          "https://unsplash.com/photos/IbPxGLgJiMI/download?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwzfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww",
        download_location:
          "https://api.unsplash.com/photos/IbPxGLgJiMI/download?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHwzfHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww",
      },
      likes: 897,
      liked_by_user: false,
      current_user_collections: [],
      sponsorship: null,
      topic_submissions: {},
      asset_type: "photo",
      user: {
        id: "G73IyKbCkec",
        updated_at: "2025-01-25T01:21:12Z",
        username: "ejleusink",
        name: "Erik-Jan Leusink",
        first_name: "Erik-Jan",
        last_name: "Leusink",
        twitter_username: null,
        portfolio_url: null,
        bio: null,
        location: "Netherlands",
        links: {
          self: "https://api.unsplash.com/users/ejleusink",
          html: "https://unsplash.com/@ejleusink",
          photos: "https://api.unsplash.com/users/ejleusink/photos",
          likes: "https://api.unsplash.com/users/ejleusink/likes",
          portfolio: "https://api.unsplash.com/users/ejleusink/portfolio",
          following: "https://api.unsplash.com/users/ejleusink/following",
          followers: "https://api.unsplash.com/users/ejleusink/followers",
        },
        profile_image: {
          small:
            "https://images.unsplash.com/profile-1551471857093-3a080d2b8f2e?ixlib=rb-4.0.3&crop=faces&fit=crop&w=32&h=32",
          medium:
            "https://images.unsplash.com/profile-1551471857093-3a080d2b8f2e?ixlib=rb-4.0.3&crop=faces&fit=crop&w=64&h=64",
          large:
            "https://images.unsplash.com/profile-1551471857093-3a080d2b8f2e?ixlib=rb-4.0.3&crop=faces&fit=crop&w=128&h=128",
        },
        instagram_username: null,
        total_collections: 1,
        total_likes: 248,
        total_photos: 137,
        total_promoted_photos: 35,
        total_illustrations: 0,
        total_promoted_illustrations: 0,
        accepted_tos: true,
        for_hire: false,
        social: {
          instagram_username: null,
          portfolio_url: null,
          twitter_username: null,
          paypal_email: null,
        },
      },
    },
    {
      id: "13ky5Ycf0ts",
      slug: "sitting-orange-persian-cat-13ky5Ycf0ts",
      alternative_slugs: {
        en: "sitting-orange-persian-cat-13ky5Ycf0ts",
        es: "gato-persa-naranja-sentado-13ky5Ycf0ts",
        ja: "座っているオレンジ色のペルシャ猫-13ky5Ycf0ts",
        fr: "chat-persan-orange-assis-13ky5Ycf0ts",
        it: "gatto-persiano-arancione-seduto-13ky5Ycf0ts",
        ko: "앉아있는-오렌지-페르시아-고양이-13ky5Ycf0ts",
        de: "sitzende-orangefarbene-perserkatze-13ky5Ycf0ts",
        pt: "gato-persa-laranja-sentado-13ky5Ycf0ts",
        id: "duduk-oranye-kucing-persia-13ky5Ycf0ts",
      },
      created_at: "2018-09-10T14:39:31Z",
      updated_at: "2025-08-05T13:42:33Z",
      promoted_at: null,
      width: 3648,
      height: 5472,
      color: "#404040",
      blur_hash: "LGCY{,jF0fbI57of-oWVE1WVxZsm",
      description: "Olly",
      alt_description: "sitting orange Persian cat",
      breadcrumbs: [],
      urls: {
        raw: "https://images.unsplash.com/photo-1536590158209-e9d615d525e4?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHw0fHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0",
        full: "https://images.unsplash.com/photo-1536590158209-e9d615d525e4?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHw0fHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=85",
        regular:
          "https://images.unsplash.com/photo-1536590158209-e9d615d525e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHw0fHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=1080",
        small:
          "https://images.unsplash.com/photo-1536590158209-e9d615d525e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHw0fHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=400",
        thumb:
          "https://images.unsplash.com/photo-1536590158209-e9d615d525e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHw0fHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww&ixlib=rb-4.1.0&q=80&w=200",
        small_s3:
          "https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1536590158209-e9d615d525e4",
      },
      links: {
        self: "https://api.unsplash.com/photos/sitting-orange-persian-cat-13ky5Ycf0ts",
        html: "https://unsplash.com/photos/sitting-orange-persian-cat-13ky5Ycf0ts",
        download:
          "https://unsplash.com/photos/13ky5Ycf0ts/download?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHw0fHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww",
        download_location:
          "https://api.unsplash.com/photos/13ky5Ycf0ts/download?ixid=M3w3ODQ5MjB8MHwxfHNlYXJjaHw0fHxjYXRzfGVufDB8fHx8MTc1NDQxMzA3M3ww",
      },
      likes: 1057,
      liked_by_user: false,
      current_user_collections: [],
      sponsorship: null,
      topic_submissions: {
        animals: {
          status: "approved",
          approved_on: "2020-07-01T12:55:07Z",
        },
      },
      asset_type: "photo",
      user: {
        id: "T5wCmbzz2Hs",
        updated_at: "2025-07-02T12:02:26Z",
        username: "zoegayah",
        name: "Zoë Gayah Jonker",
        first_name: "Zoë Gayah",
        last_name: "Jonker",
        twitter_username: null,
        portfolio_url: "http://www.zoefotografie.com",
        bio: null,
        location: "Zwolle",
        links: {
          self: "https://api.unsplash.com/users/zoegayah",
          html: "https://unsplash.com/@zoegayah",
          photos: "https://api.unsplash.com/users/zoegayah/photos",
          likes: "https://api.unsplash.com/users/zoegayah/likes",
          portfolio: "https://api.unsplash.com/users/zoegayah/portfolio",
        },
        profile_image: {
          small:
            "https://images.unsplash.com/profile-1635755565741-ee4f09deb645image?ixlib=rb-4.1.0&crop=faces&fit=crop&w=32&h=32",
          medium:
            "https://images.unsplash.com/profile-1635755565741-ee4f09deb645image?ixlib=rb-4.1.0&crop=faces&fit=crop&w=64&h=64",
          large:
            "https://images.unsplash.com/profile-1635755565741-ee4f09deb645image?ixlib=rb-4.1.0&crop=faces&fit=crop&w=128&h=128",
        },
        instagram_username: null,
        total_collections: 0,
        total_likes: 29,
        total_photos: 53,
        total_promoted_photos: 9,
        total_illustrations: 0,
        total_promoted_illustrations: 0,
        accepted_tos: true,
        for_hire: false,
        social: {
          instagram_username: null,
          portfolio_url: "http://www.zoefotografie.com",
          twitter_username: null,
          paypal_email: null,
        },
      },
    },
  ],
};
