import { FC } from 'react'

import Page from '../layouts/Page'
import Section from '../layouts/Section'

const About: FC = () => {
  return (
    <Page>
      <Section className='max-w-[60vw] bg-gray-800 text-gray-100'>
        <h1 className='max-w-max mx-auto text-4xl font-medium'>User Info Stepper</h1>
        <p className='text-lg py-4 max-w-[650px] text-center mx-auto'>
          User Info Stepper, a modal workflow with three steps using React and TypeScript. The
          workflow collect and then review personal information from a user. The modal should have
          "Back", "Next", and "Finish" buttons to control the workflow
        </p>
        <p className='text-lg pb-2'>Here’s what’s included:</p>
        <ul className='list-disc pl-5 space-y-2 text-md'>
          <li>
            <strong>Vite:</strong> A modern build tool that significantly improves the frontend
            development experience.
          </li>
          <li>
            <strong>React:</strong> A JavaScript library for building user interfaces with high
            performance and predictive capabilities.
          </li>
          <li>
            <strong>TypeScript:</strong> Adds static types to JavaScript for better code quality and
            developer productivity.
          </li>
          <li>
            <strong>Tailwind CSS:</strong> A utility-first CSS framework for rapidly building custom
            designs without leaving HTML.
          </li>
          <li>
            <strong>DaisyUI:</strong> A rich UI component library to enhance and simplify React
            applications.
          </li>
          <li>
            <strong>ESLint:</strong> The pluggable linting utility for JavaScript and JSX,
            configured with Airbnb's base rules to ensure code quality.
          </li>
          <li>
            <strong>React Router:</strong> Library for routing in React applications, allowing
            multiple views and data segmentation.
          </li>
          <li>
            <strong>Prettier:</strong> An opinionated code formatter that enforces a consistent
            style by parsing code and re-printing it with its own rules, thus ensuring a uniform
            code format across project.
          </li>
          <li>
            <strong>Commitlint:</strong> Helps enforce a convention in commit messages which is
            vital for maintainable version control practices.
          </li>
        </ul>
      </Section>
    </Page>
  )
}

export default About
