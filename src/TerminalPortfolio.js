import React, { useState, useEffect, useRef } from 'react';

const TerminaPortfolio = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([]);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: 'Available commands: about, skills, experience, projects, contact, clear',
    about: 'Seasoned front-end developer with over 9 years of experience, adept at collaborating with cross-functional teams. Skilled in building complex secure websites using modern JavaScript frameworks and TypeScript features, incorporating state management. Proficient in developing operating system-agnostic mobile applications. Possesses in-depth knowledge of data structures, enabling effective problem-solving and algorithmic proficiency.',
    skills: 'Angular, RxJS, JavaScript, TypeScript, Web Security, NgRx, Node.js. HTML5, CSS3, SCSS, Git, REST API, Jenkins, Agile, SCRUM, Postman, SDLC, Figma, Responsive layout and mobile-first UI, PWA, axe Dev tool, Bootstrap, Ionic, Electron, Webpack, Accessibility, WCAG, D3.js, AWS',
    experience: '1. Senior Software Developer, CAPCO (May 2021 - Present)<br/> 2. Software Developer, SOTI (January 2020 - May 2021)<br/> 3. Software Engineer II, Thermo Fisher Scientific (April 2017 - November 2019)<br/> 4. Software Engineer I, Thermo Fisher Scientific (July 2015 - March 2017)',
    projects: `1. Quota for YNAB <br/>Launched an open-source helper app for YNAB software using the Ionic framework, leveraging the third-party YNAB API to customize and streamline data processing, achieving over 900 installations with a 4.8-star rating on the Play Store.<br/>
    2. SMS to YNAB<br/>Created an open-source app for parsing messages and uploading YNAB budget data, implementing a user-friendly template mechanism for workflow automation, and solely resolving reported issues while delivering multiple improvement releases.
    `,
    contact: 'Email: akashpjames@gmail.com<br/><a target="_blank" href="https://www.linkedin.com/in/akashpjames" style="color: #0f0">Go to my LinkedIn here</a>',
    clear: () => setOutput([]),
  };

  const handleInput = (e) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim().toLowerCase();
      let response;

      if (trimmedInput in commands) {
        response = typeof commands[trimmedInput] === 'function' 
          ? commands[trimmedInput]() 
          : commands[trimmedInput];
      } else {
        response = `Command not found: ${trimmedInput}. Type 'help' for available commands.`;
      }

      if (trimmedInput === 'clear') {
        setOutput([{ type: 'output', text: "Welcome to my portfolio! Type 'help' for available commands." }]);
      } else {
        setOutput(prev => [...prev, { type: 'input', text: input }, { type: 'output', text: response }]);
      }
      setInput('');
    }
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    setOutput([{ type: 'output', text: "Welcome to Akash's website! Type 'help' for available commands." }]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [output]);

  const pageStyle = {
    backgroundColor: '#000',
    minHeight: '100vh',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const terminalStyle = {
    fontFamily: 'monospace',
    backgroundColor: '#000',
    color: '#0f0',
    padding: '20px',
    borderRadius: '5px',
    width: '600px',
    height: '400px',
    overflow: 'auto',
    border: '1px solid #0f0',
    fontSize: '14px',
    lineHeight: '1.6',
  };

  const inputContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const inputStyle = {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#0f0',
    fontSize: '14px',
    fontFamily: 'inherit',
    width: '100%',
    outline: 'none',
    caretColor: '#0f0',
  };

  return (
    <div style={pageStyle} onClick={focusInput}>
      <div style={terminalStyle} ref={terminalRef}>
        {output.map((item, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            {item.type === 'input' ? '$ ' : ''}
            <span dangerouslySetInnerHTML={{ __html: item.text }} />
          </div>
        ))}
        <div style={inputContainerStyle}>
          <span>$ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleInput}
            style={inputStyle}
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default TerminaPortfolio;