import React from 'react';
import { View } from 'react-native';
import { Text, Image } from '../../../Core';

function getInitials(string) {
  var names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

function RecipeComment(props) {
  const { user, comment } = props.comment;
  const { name, username } = user;
  const initials = getInitials(name);
  const avatarSize = 38;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 13,
        alignItems: 'flex-start'
      }}
    >
      <View style={{ width: avatarSize, marginRight: 10 }}>
        <Image
          rounded={true}
          width={avatarSize}
          height={avatarSize}
          url={`https://via.placeholder.com/${avatarSize}?text=${initials}`}
        />
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 0 }}>
          <Text bold>{username}</Text>
        </View>
        <Text>{comment}</Text>
      </View>
    </View>
  );
}

export default RecipeComment;
