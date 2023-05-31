export const followAddUpdate = (profile, selectedProfile, following_id) => {
  return profile.id === selectedProfile.id
    ? {
        ...profile,
        followed_count: profile.followed_count + 1,
        following_id,
      }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count + 1,
      }
    : profile;
};

export const followDeleteUpdate = (profile, selectedProfile) => {
  return profile.id === selectedProfile.id
    ? {
        ...profile,
        followed_count: profile.followed_count - 1,
        following_id: null,
      }
    : profile.is_owner
    ? {
        ...profile,
        following_count: profile.following_count - 1,
      }
    : profile;
};
