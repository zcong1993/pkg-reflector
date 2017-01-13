import Listr from 'listr'
import exec from '../src/exec'


const tasks = new Listr([
      {
        title: 'Done',
        task: () => Promise.resolve('Bar')
    },
        {
        title: 'Done',
        task: () => Promise.resolve('Bar')
    },
    {
        title: 'Success',
        task: () => exec('yarn', ['add', 'jquery'])
    },
    {
        title: 'Done',
        task: () => Promise.resolve('Bar')
    }
]);

tasks.run().catch(err => {
    console.error(err);
});
