import React from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

export const About: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-earth-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-earth-800 mb-4 sm:mb-6">The Practitioner</h1>
          <p className="text-base sm:text-lg md:text-xl text-earth-600 font-light max-w-2xl mx-auto px-4">
            Ian Turley L.Ac — Licensed Acupuncturist
          </p>
        </div>

        {/* Bio Section */}
        <div className="grid md:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-start mb-12 sm:mb-16 md:mb-24">
            <div className="md:col-span-5 relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                        src="https://picsum.photos/800/1200?random=5" 
                        alt="Therapist profile" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-autumn-100 p-8 rounded-full hidden lg:block z-[-1] w-48 h-48"></div>
            </div>
            
            <div className="md:col-span-7 space-y-4 sm:space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-earth-800">Ian Turley L.Ac</h2>
                <h3 className="text-autumn-700 font-medium tracking-wide uppercase text-xs sm:text-sm">Licensed Acupuncturist</h3>
                
                <div className="text-earth-600 space-y-3 sm:space-y-4 leading-relaxed text-sm sm:text-base">
                    <p>
                        My journey into medicine began well before I ever took my first class. As a child I marveled at every life-form I came across. I threw dead bugs into anthills, collected fireflies and ladybugs, and lifted river rocks in search of iridescent salamanders and newts. This fundamental curiosity about biology stuck with me and inevitably drove me to study the human body; but before that, I had to cut my teeth in the working world.
                    </p>
                    <p>
                        From construction, to commercial fishing in Alaska, to film production, landscaping and winemaking, my employers expected the job to get done and get done well. Those experiences taught me patience, accountability, and above all else how to get tangible results — values that now guide how I work with patients.
                    </p>
                    <p>
                        While earning my BA in Psychology, I noticed that pain, stress, and injury often stood in the way of emotional and psychological healing. As a massage therapist, I further explored the link between physical and emotional health and observed that mobility and freedom are closely intertwined. It was this insight that gave birth to the name of my practice, Breakthrough.
                    </p>
                    <p>
                        My life outside the clinic revolves around music, food and nature. I've played sports most of my life and have spent the last 4 years focussing on the study of Chinese martial arts (Xingyi and Baguazhang). The pursuit of martial arts, in particular, has helped me to understand hard-to-grasp concepts like Qi ("energy") and Shen ("mind") by grounding them in physical practices. Making the conceptual tangible is essential to providing digestible, down-to-earth medicine and I'm grateful to have the opportunity to work with every patient who walks in my door.
                    </p>
                </div>

                <div className="pt-8">
                    <Link to="/contact">
                        <Button>Book with Ian</Button>
                    </Link>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};
