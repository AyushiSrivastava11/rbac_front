import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import {Label} from '../../components/ui/label';

const Adddialog = ({ isOpen, onClose, onAdd }) => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      const newCategory = { name };
      onAdd(newCategory);
      setName('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex flex-col items-center text-center">
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription className="mt-2">
              Enter the category name and click Save to add it.
            </DialogDescription>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center py-4">
          <div className="w-full max-w-md grid grid-cols-1 gap-4">
              
             
              <Input
                id="categoryName"
                placeholder="Category Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="secondary" onClick={onClose}>Cancel</Button>
            <Button type="submit" className="ml-2">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Adddialog;
