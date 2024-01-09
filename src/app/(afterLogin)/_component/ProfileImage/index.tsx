interface Props {
  profileImageUrl: string | null;
  nickname: string;
}

export default function ProfileImage({ profileImageUrl, nickname }: Props) {
  return (
    <>
      {profileImageUrl ? (
        <div
          className='h-full w-full'
          style={{ backgroundImage: `url(${profileImageUrl})`, backgroundSize: 'contain' }}
        ></div>
      ) : (
        <span>{nickname[0]}</span>
      )}
    </>
  );
}
