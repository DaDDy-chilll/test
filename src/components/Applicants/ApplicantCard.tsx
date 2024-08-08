import { cn } from '@/lib/utils';
import React from 'react';
import { Avatar,AvatarFallback,AvatarImage } from '@radix-ui/react-avatar';
interface UserProfileCardProps {
  avatar: string; // URL for avatar image
  username: string;
  country: string;
  jlptLevel: string;
  jobs: string[];
  className : string;
  key : number
}

const ApplicantCard: React.FC<UserProfileCardProps> = ({ avatar="https://github.com/shadcn.png", username, country, jlptLevel, jobs,className, key }) => {
  return (
    <div key={key} className= {cn("max-w-xs bg-cardBackground text-white p-4 rounded-lg shadow-md",className)}>
      <div className="flex justify-center">
      <Avatar className="w-20 h-20">
              <AvatarImage src={avatar} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
      </div>
      <div className="text-center mt-4">
        <h2 className="text-xl font-bold">{username}</h2>
        <p className="text-gray-400">{country}</p>
        <p className="text-blue-300">{jlptLevel}</p>
      </div>
      <div className="flex justify-between mt-4">
        {jobs.map((job, index) => (
          <button
            key={index}
            className="bg-gray-700 hover:bg-gray-600 text-sm py-2 px-4 rounded-full"
          >
            {job}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ApplicantCard;
