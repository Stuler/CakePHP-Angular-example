<?php
declare(strict_types=1);

namespace App\Controller;

use Exception;

/**
 * Users Controller
 *
 * @property \App\Model\Table\UsersTable $Users
 */
class UsersController extends AppController
{

    public function index()
    {
        $this->autoRender = false;

        try {
            $users = $this->Users->find();

            return $this->response->withType('application/json')
                ->withStringBody(json_encode(['users' => $users])); // ✅ Wrap in 'users' key
        } catch (Exception $e) {
            return $this->response->withType('application/json')
                ->withStatus(500)
                ->withStringBody(json_encode(['error' => 'Database Error']));
        }
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

    public function signIn()
    {
        if ($this->request->is('post')) {
            $user = $this->Auth->identify();
            if ($user) {
                $this->Auth->setUser($user);

                return $this->redirect($this->Auth->redirectUrl());
            }
            $this->Flash->error(__('Invalid username or password, try again'));
        }
    }
}
