<?php

namespace App\Controller;

use App\Controller\AppController;

class UsersController extends AppController
{
    public function index(): void
    {
        $users = $this->paginate($this->Users);
        $this->set(compact('users'));
    }

    public function signUp()
    {
        $user = $this->Users->newEmptyEntity();
        if ($this->request->is('post')) {
            $user = $this->Users->patchEntity($user, $this->request->getData());
            if ($this->Users->save($user)) {
                $this->Flash->success(__('The user has been saved.'));
                return $this->redirect(['action' => 'index']);
            }
            $this->Flash->error(__('The user could not be saved. Please, try again.'));
        }
        $this->set(compact('user'));
    }

}
