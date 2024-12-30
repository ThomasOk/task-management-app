import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../projects/entities/project.entity';
import { Task } from '../tasks/entities/task.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async run() {
    try {
      console.log('Clearing existing data...');
      //await this.taskRepository.clear();
      //await this.projectRepository.clear();
      // D'abord supprimer les tâches car elles dépendent des projets
      await this.taskRepository.delete({});
      // Ensuite supprimer les projets
      await this.projectRepository.delete({});

      console.log('Inserting new projects...');
      const projects = [
        {
          name: 'Site E-commerce',
          slug: 'site-ecommerce',
          status: 'in-progress',
          collaborators: ['alice@example.com', 'bob@example.com'],
        },
        {
          name: 'Application Mobile',
          slug: 'app-mobile',
          status: 'in-progress',
          collaborators: ['charlie@example.com'],
        },
        {
          name: 'Dashboard Analytics',
          slug: 'dashboard-analytics',
          status: 'completed',
          collaborators: ['alice@example.com', 'david@example.com'],
        },
        {
          name: 'API REST',
          slug: 'api-rest',
          status: 'on-hold',
          collaborators: ['bob@example.com', 'eve@example.com'],
        },
        {
          name: 'Application CRM',
          slug: 'app-crm',
          status: 'in-progress',
          collaborators: ['frank@example.com', 'grace@example.com'],
        },
        {
          name: 'Plateforme LMS',
          slug: 'platform-lms',
          status: 'planning',
          collaborators: ['henry@example.com', 'iris@example.com'],
        },
        {
          name: 'Application IoT',
          slug: 'app-iot',
          status: 'in-progress',
          collaborators: ['jack@example.com'],
        },
        {
          name: 'Système de Facturation',
          slug: 'billing-system',
          status: 'completed',
          collaborators: ['kelly@example.com', 'liam@example.com'],
        },
        {
          name: 'Application de Gestion RH',
          slug: 'hr-management',
          status: 'in-progress',
          collaborators: ['mike@example.com', 'nina@example.com'],
        },
        {
          name: 'Portail Client',
          slug: 'customer-portal',
          status: 'planning',
          collaborators: ['oliver@example.com', 'patricia@example.com'],
        },
      ];
      const savedProjects = await this.projectRepository.save(projects);
      console.log(`Successfully seeded ${savedProjects.length} projects`);
      console.log('Inserting tasks...');
      const tasks = [];

      // Créer des tâches pour chaque projet
      for (const project of savedProjects) {
        // Générer 3 à 5 tâches par projet
        const numTasks = Math.floor(Math.random() * 3) + 3;

        for (let i = 0; i < numTasks; i++) {
          const task = {
            name: `Tâche ${i + 1} - ${project.name}`,
            description: `Description détaillée de la tâche ${i + 1} pour le projet ${project.name}`,
            status: ['to-do', 'in-progress', 'completed'][
              Math.floor(Math.random() * 3)
            ],
            project_id: project.id,
            due_date: new Date(
              Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000,
            ), // Date aléatoire dans les 30 prochains jours
            collaborators: project.collaborators.slice(
              0,
              Math.floor(Math.random() * project.collaborators.length + 1),
            ),
          };
          tasks.push(task);
        }
      }

      const savedTasks = await this.taskRepository.save(tasks);
      console.log(`Successfully seeded ${savedTasks.length} tasks`);

      return {
        projectsCount: savedProjects.length,
        tasksCount: savedTasks.length,
      };
    } catch (error) {
      console.error('Error during seeding:', error);
      throw error;
    }
  }
}
