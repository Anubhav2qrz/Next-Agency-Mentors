import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { toast } from "sonner";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://qpapjhzfimwzhgffdkof.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwYXBqaHpmaW13emhnZmZka29mIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NzMxMjksImV4cCI6MjA3MzI0OTEyOX0.1sn7-TzlbSCgiVk7jR2miackaoHzPNP9Wo9O_z5sj5Y" 
);

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  status: string;
  thumbnail_url?: string;
  created_at?: string;
}

const Admin = ({ onLogin }: { onLogin: () => void }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "",
    status: "draft",
  });
  const [file, setFile] = useState<File | null>(null);
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  // ✅ Fetch projects
  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load projects");
    } else {
      setProjects(data as Project[]);
    }
  }

  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
    }
  }, [isLoggedIn]);

  // ✅ Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    });

    if (error) {
      toast.error("Invalid credentials");
    } else {
      toast.success("Login successful");
      setIsLoggedIn(true);
      onLogin();
    }
  };

  // ✅ Upload thumbnail to Supabase
  const uploadThumbnail = async (file: File) => {
    const fileName = `${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage
      .from("project-thumbnails") // ⚠️ make sure this bucket exists
      .upload(fileName, file);

    if (uploadError) {
      toast.error("Failed to upload image");
      return null;
    }

    const { data } = supabase.storage
      .from("project-thumbnails")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  // ✅ Add project
  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProject.title || !newProject.description) {
      toast.error("Please fill in all fields");
      return;
    }

    let thumbnailUrl = null;
    if (file) {
      thumbnailUrl = await uploadThumbnail(file);
    }

    const { error } = await supabase.from("projects").insert([
      {
        ...newProject,
        thumbnail_url: thumbnailUrl,
      },
    ]);

    if (error) {
      toast.error("Failed to add project");
    } else {
      toast.success("Project added");
      setNewProject({ title: "", description: "", category: "", status: "draft" });
      setFile(null);
      fetchProjects();
    }
  };

  // ✅ Delete project
  const deleteProject = async (id: number) => {
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete project");
    } else {
      toast.success("Project deleted");
      fetchProjects();
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {!isLoggedIn ? (
        // 🔹 Login Form
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-gray-800 p-6 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            />
            <Button type="submit" className="w-full">Login</Button>
          </form>
        </motion.div>
      ) : (
        // 🔹 Admin Dashboard
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

          <Tabs defaultValue="projects" className="w-full">
            <TabsList>
              <TabsTrigger value="projects">Manage Projects</TabsTrigger>
              <TabsTrigger value="add">Add Project</TabsTrigger>
            </TabsList>

            {/* Manage Projects */}
            <TabsContent value="projects">
              <div className="grid gap-4 mt-4">
                {projects.map((project) => (
                  <Card key={project.id} className="bg-gray-800">
                    <CardContent className="flex justify-between items-center p-4">
                      <div className="flex items-center gap-4">
                        {project.thumbnail_url && (
                          <img
                            src={project.thumbnail_url}
                            alt={project.title}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-semibold">{project.title}</h3>
                          <p className="text-gray-400">{project.description}</p>
                        </div>
                      </div>
                      <Button
                        variant="destructive"
                        onClick={() => deleteProject(project.id)}
                      >
                        Delete
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Add Project */}
            <TabsContent value="add">
              <form onSubmit={addProject} className="space-y-4 mt-4">
                <Input
                  placeholder="Title"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                />
                <Input
                  placeholder="Description"
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                />
                <Input
                  placeholder="Category"
                  value={newProject.category}
                  onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                />
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <Button type="submit">Add Project</Button>
              </form>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  );
};

export default Admin;
