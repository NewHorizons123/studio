import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const teamMembers = [
  { name: 'Aadil Memon', role: 'AI Lead & Product Vision', imageId: 'aadil-memon' },
  { name: '[Member 2 Name]', role: 'Full-Stack Developer', imageId: 'member-2' },
  { name: '[Member 3 Name]', role: 'Frontend & UX Designer', imageId: 'member-3' },
];

export default function Team() {
  return (
    <section id="team" className="py-16 sm:py-24 bg-card/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">
            Meet the Team
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The passionate minds behind making global education accessible.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => {
            const memberImage = PlaceHolderImages.find(p => p.id === member.imageId);
            return (
              <Card key={member.name} className="text-center p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex flex-col items-center p-0">
                  <Avatar className="w-32 h-32 mb-4 border-4 border-primary/20">
                    {memberImage && (
                       <AvatarImage src={memberImage.imageUrl} alt={member.name} data-ai-hint={memberImage.imageHint}/>
                    )}
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="text-lg font-semibold font-headline">{member.name}</h3>
                  <p className="text-primary">{member.role}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
