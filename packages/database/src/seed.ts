import { PrismaClient, UserRole, ProjectStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...\n');

  // Clear existing data
  console.log('Clearing existing data...');
  await prisma.annotation.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.post.deleteMany();
  await prisma.space.deleteMany();
  await prisma.project.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.funder.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleared existing data\n');

  // Create Users
  console.log('Creating users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: 'Dr. Anna Schmidt',
        email: 'anna.schmidt@example.com',
        role: UserRole.RESEARCHER,
        affiliation: 'TU Vienna',
        profile: {
          create: {
            bio: 'Climate scientist researching sustainable energy solutions.',
            orcidId: '0000-0001-2345-6789',
            researchAreas: ['Climate Science', 'Renewable Energy', 'Sustainability'],
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Prof. Michael Weber',
        email: 'michael.weber@example.com',
        role: UserRole.RESEARCHER,
        affiliation: 'University of Zurich',
        profile: {
          create: {
            bio: 'AI researcher focusing on healthcare applications.',
            orcidId: '0000-0002-3456-7890',
            researchAreas: ['Artificial Intelligence', 'Healthcare', 'Machine Learning'],
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Dr. Sarah Johnson',
        email: 'sarah.johnson@example.com',
        role: UserRole.RESEARCHER,
        affiliation: 'ETH Zurich',
        profile: {
          create: {
            bio: 'Materials scientist working on nanotechnology applications.',
            orcidId: '0000-0003-4567-8901',
            researchAreas: ['Materials Science', 'Nanotechnology', 'Engineering'],
          },
        },
      },
    }),
    prisma.user.create({
      data: {
        name: 'Emma Müller',
        email: 'emma.mueller@ffg.at',
        role: UserRole.FUNDER,
        affiliation: 'Austrian Research Promotion Agency (FFG)',
      },
    }),
    prisma.user.create({
      data: {
        name: 'Admin User',
        email: 'admin@coma.example.com',
        role: UserRole.ADMIN,
      },
    }),
  ]);
  console.log(`✅ Created ${users.length} users\n`);

  // Create Funders
  console.log('Creating funding organizations...');
  const funders = await Promise.all([
    prisma.funder.create({
      data: {
        name: 'Austrian Research Promotion Agency (FFG)',
        description:
          'The Austrian Research Promotion Agency (FFG) is the national funding agency for industrial research and development in Austria.',
        website: 'https://www.ffg.at',
        country: 'Austria',
      },
    }),
    prisma.funder.create({
      data: {
        name: 'European Commission - Horizon Europe',
        description:
          "The EU's key funding programme for research and innovation, tackling climate change, helping to achieve the UN's Sustainable Development Goals and boosting the EU's competitiveness and growth.",
        website: 'https://ec.europa.eu/programmes/horizon-europe',
        country: 'European Union',
      },
    }),
    prisma.funder.create({
      data: {
        name: 'Swiss National Science Foundation (SNSF)',
        description:
          'The Swiss National Science Foundation (SNSF) is a research funding organization mandated by the Swiss Confederation.',
        website: 'https://www.snf.ch',
        country: 'Switzerland',
      },
    }),
    prisma.funder.create({
      data: {
        name: 'German Research Foundation (DFG)',
        description:
          'The German Research Foundation (DFG) is the central independent research funding organisation in Germany.',
        website: 'https://www.dfg.de',
        country: 'Germany',
      },
    }),
  ]);
  console.log(`✅ Created ${funders.length} funders\n`);

  // Create Tags
  console.log('Creating tags...');
  const tags = await Promise.all([
    prisma.tag.create({ data: { name: 'Climate Change', category: 'Environment' } }),
    prisma.tag.create({ data: { name: 'Artificial Intelligence', category: 'Technology' } }),
    prisma.tag.create({ data: { name: 'Healthcare', category: 'Medicine' } }),
    prisma.tag.create({ data: { name: 'Renewable Energy', category: 'Environment' } }),
    prisma.tag.create({ data: { name: 'Machine Learning', category: 'Technology' } }),
    prisma.tag.create({ data: { name: 'Nanotechnology', category: 'Technology' } }),
    prisma.tag.create({ data: { name: 'Sustainability', category: 'Environment' } }),
    prisma.tag.create({ data: { name: 'Biotechnology', category: 'Medicine' } }),
    prisma.tag.create({ data: { name: 'Data Science', category: 'Technology' } }),
    prisma.tag.create({ data: { name: 'Cancer Research', category: 'Medicine' } }),
  ]);
  console.log(`✅ Created ${tags.length} tags\n`);

  // Create Projects
  console.log('Creating projects...');
  const projects = await Promise.all([
    prisma.project.create({
      data: {
        title: 'Sustainable Energy Solutions for Alpine Regions',
        summary:
          'This project investigates novel renewable energy solutions tailored for alpine environments, focusing on solar and wind integration.',
        description:
          'Detailed research on implementing sustainable energy infrastructure in challenging mountainous terrain, considering environmental impact and economic feasibility.',
        startDate: new Date('2022-01-01'),
        endDate: new Date('2024-12-31'),
        fundingAmount: 450000,
        currency: 'EUR',
        status: ProjectStatus.ACTIVE,
        funderId: funders[0].id,
        piUserId: users[0].id,
        tags: {
          connect: [
            { id: tags[0].id }, // Climate Change
            { id: tags[3].id }, // Renewable Energy
            { id: tags[6].id }, // Sustainability
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        title: 'AI-Powered Diagnostic Tools for Early Cancer Detection',
        summary:
          'Development of machine learning algorithms for analyzing medical imaging data to improve early detection of various cancer types.',
        description:
          'This interdisciplinary project combines expertise in artificial intelligence, medical imaging, and oncology to create diagnostic tools that can identify cancer at earlier stages.',
        startDate: new Date('2021-06-01'),
        endDate: new Date('2024-05-31'),
        fundingAmount: 850000,
        currency: 'EUR',
        status: ProjectStatus.ACTIVE,
        funderId: funders[1].id,
        piUserId: users[1].id,
        tags: {
          connect: [
            { id: tags[1].id }, // AI
            { id: tags[2].id }, // Healthcare
            { id: tags[4].id }, // Machine Learning
            { id: tags[9].id }, // Cancer Research
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        title: 'Nanomaterials for Water Purification in Developing Countries',
        summary:
          'Research into cost-effective nanomaterial-based water filtration systems for communities lacking access to clean water.',
        description:
          'This project develops innovative nanomaterial filters that can remove contaminants from water sources at low cost, suitable for deployment in resource-limited settings.',
        startDate: new Date('2023-01-01'),
        endDate: new Date('2025-12-31'),
        fundingAmount: 320000,
        currency: 'CHF',
        status: ProjectStatus.ACTIVE,
        funderId: funders[2].id,
        piUserId: users[2].id,
        tags: {
          connect: [
            { id: tags[5].id }, // Nanotechnology
            { id: tags[6].id }, // Sustainability
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        title: 'Climate Impact Assessment of Urban Green Spaces',
        summary:
          'Comprehensive study on how urban green infrastructure affects local climate patterns and air quality in European cities.',
        description:
          'Multi-city analysis using remote sensing, ground measurements, and climate modeling to quantify the benefits of urban forests and parks.',
        startDate: new Date('2020-03-01'),
        endDate: new Date('2023-02-28'),
        fundingAmount: 275000,
        currency: 'EUR',
        status: ProjectStatus.COMPLETED,
        funderId: funders[3].id,
        piUserId: users[0].id,
        tags: {
          connect: [
            { id: tags[0].id }, // Climate Change
            { id: tags[6].id }, // Sustainability
          ],
        },
      },
    }),
    prisma.project.create({
      data: {
        title: 'Predictive Models for Pandemic Response Optimization',
        summary:
          'Development of data-driven models to optimize healthcare resource allocation during pandemic scenarios.',
        description:
          'Using historical pandemic data and machine learning to create predictive tools for hospital capacity planning, vaccine distribution, and supply chain management.',
        startDate: new Date('2021-01-01'),
        endDate: new Date('2023-12-31'),
        fundingAmount: 650000,
        currency: 'EUR',
        status: ProjectStatus.COMPLETED,
        funderId: funders[1].id,
        piUserId: users[1].id,
        tags: {
          connect: [
            { id: tags[1].id }, // AI
            { id: tags[2].id }, // Healthcare
            { id: tags[8].id }, // Data Science
          ],
        },
      },
    }),
  ]);
  console.log(`✅ Created ${projects.length} projects\n`);

  // Create Spaces
  console.log('Creating community spaces...');
  const spaces = await Promise.all([
    prisma.space.create({
      data: {
        name: 'Climate Research',
        description:
          'Discussion space for climate scientists, environmental researchers, and sustainability experts.',
        visibility: 'PUBLIC',
      },
    }),
    prisma.space.create({
      data: {
        name: 'AI for Healthcare',
        description:
          'Community for researchers working at the intersection of artificial intelligence and healthcare.',
        visibility: 'PUBLIC',
      },
    }),
    prisma.space.create({
      data: {
        name: 'Nanotechnology Applications',
        description: 'Forum for discussing practical applications of nanotechnology across industries.',
        visibility: 'PUBLIC',
      },
    }),
  ]);
  console.log(`✅ Created ${spaces.length} spaces\n`);

  // Create Posts
  console.log('Creating posts...');
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        spaceId: spaces[0].id,
        authorId: users[0].id,
        title: 'Lessons from Alpine Renewable Energy Projects',
        content:
          "After two years of fieldwork in alpine regions, I've learned that successful renewable energy implementation requires deep understanding of local conditions and community engagement. Happy to share our findings and discuss challenges.",
      },
    }),
    prisma.post.create({
      data: {
        spaceId: spaces[1].id,
        authorId: users[1].id,
        title: 'New Advances in Medical Image Analysis',
        content:
          'Our team has achieved 95% accuracy in early-stage cancer detection using deep learning. Looking forward to collaborating with other researchers in this field. What are the biggest challenges you face?',
      },
    }),
  ]);
  console.log(`✅ Created ${posts.length} posts\n`);

  // Create Comments
  console.log('Creating comments...');
  await prisma.comment.create({
    data: {
      postId: posts[0].id,
      authorId: users[2].id,
      content:
        'This is fascinating! We encountered similar challenges in our water purification projects. Community engagement was key.',
    },
  });
  console.log('✅ Created comments\n');

  // Create Annotations
  console.log('Creating annotations...');
  await prisma.annotation.create({
    data: {
      projectId: projects[1].id,
      userId: users[3].id,
      content:
        'Excellent progress on early cancer detection. This project has high impact potential and aligns well with EU healthcare priorities.',
      category: 'High Impact',
    },
  });
  console.log('✅ Created annotations\n');

  console.log('🎉 Database seeded successfully!');
  console.log('\nSummary:');
  console.log(`- ${users.length} users`);
  console.log(`- ${funders.length} funders`);
  console.log(`- ${tags.length} tags`);
  console.log(`- ${projects.length} projects`);
  console.log(`- ${spaces.length} spaces`);
  console.log(`- ${posts.length} posts`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
