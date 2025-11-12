import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Palette, Cpu, Zap } from 'lucide-react';

const skills = [
  {
    category: "Video Editing",
    icon: <Code className="w-6 h-6" />,
    items: ["Adobe Premiere Pro", "Final Cut Pro", "DaVinci Resolve", "After Effects", "Motion Graphics", "Color Grading"],
    color: "text-neon-cyan"
  },
  {
    category: "Thumbnail Design",
    icon: <Palette className="w-6 h-6" />,
    items: ["Adobe Photoshop", "Canva", "Figma", "Typography", "Visual Composition", "Brand Identity"],
    color: "text-neon-purple"
  },
  {
    category: "Content Strategy",
    icon: <Cpu className="w-6 h-6" />,
    items: ["YouTube Analytics", "Audience Research", "SEO Optimization", "Trend Analysis", "A/B Testing", "Social Media"],
    color: "text-neon-pink"
  },
  {
    category: "Creative Tools",
    icon: <Zap className="w-6 h-6" />,
    items: ["Adobe Creative Suite", "Blender", "Cinema 4D", "Lottie", "Sound Design", "Stock Resources"],
    color: "text-neon-blue"
  }
];

const experiences = [
  {
    year: "2023 - Present",
    title: "Lead Video Editor & Designer",
    company: "Nex Agency",
    description: "Creating high-converting thumbnails and professional video edits for top YouTubers and content creators."
  },
  {
    year: "2021 - 2023",
    title: "Freelance Video Editor",
    company: "Independent Creator",
    description: "Specialized in YouTube content editing, thumbnail design, and social media video production for 100+ clients."
  },
  {
    year: "2019 - 2021",
    title: "Junior Video Editor",
    company: "Creative Media House",
    description: "Developed skills in video editing, motion graphics, and thumbnail design for various digital marketing campaigns."
  }
];

export function AboutSection() {
  return (
    <section id="about" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/10">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">About Us</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional video editing and thumbnail design services that drive engagement and growth
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-neon-glow">
                Creative Content Specialists
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                With over 5 years of experience in video editing and graphic design, 
                we specialize in creating compelling content that drives engagement and converts viewers into subscribers.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Our passion lies in understanding your brand and audience to create custom thumbnails 
                and video edits that not only look professional but also maximize click-through rates 
                and viewer retention through strategic visual storytelling.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From YouTube thumbnails to full video production, we help content creators 
                stand out in the crowded digital landscape and achieve their growth goals.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 py-8">
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-primary mb-2 animate-glow">200+</div>
                <div className="text-sm text-muted-foreground">Videos Edited</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-accent mb-2 animate-glow">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-3xl font-bold text-primary mb-2 animate-glow">500+</div>
                <div className="text-sm text-muted-foreground">Thumbnails Created</div>
              </motion.div>
            </div>
          </motion.div>

          {/* Experience Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-6 text-neon-glow">Experience</h3>
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8 border-l-2 border-primary/30"
                >
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full animate-pulse-neon" />
                  <div className="mb-2">
                    <span className="text-sm text-primary font-medium">{exp.year}</span>
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <p className="text-accent font-medium">{exp.company}</p>
                  </div>
                  <p className="text-muted-foreground text-sm">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3 className="text-2xl font-semibold mb-8 text-center text-neon-glow">
            Skills & Technologies
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="glass-card h-full hover:border-primary/50 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`${skill.color} mb-4 flex items-center gap-3`}>
                      {skill.icon}
                      <h4 className="font-semibold text-foreground">{skill.category}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <Badge 
                          key={item} 
                          variant="outline" 
                          className="text-xs hover:border-primary hover:bg-primary/10 transition-colors"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}